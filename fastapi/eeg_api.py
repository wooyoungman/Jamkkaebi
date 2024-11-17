from fastapi import FastAPI, WebSocket, WebSocketDisconnect
import numpy as np
import pandas as pd
import joblib
import asyncio

app = FastAPI()

model_path = "./unified_model2.pkl"
model = joblib.load(model_path)

TCP_IP = "0.0.0.0"
TCP_PORT = 9000
BUFFER_SIZE = 1024

websocket_clients = []
tcp_data_available = False  # TCP 데이터 상태 관리

# TCP에서 수신된 데이터를 저장하는 전역 변수
latest_tcp_data = None


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    websocket_clients.append(websocket)
    try:
        while True:
            # 클라이언트로부터 메시지 수신
            message = await websocket.receive_text()
            if message == "GET":
                # TCP 데이터가 유효한지 확인
                if tcp_data_available and latest_tcp_data:
                    # 예측 데이터 생성
                    feature_names = [
                        "delta", "theta", "lowAlpha", "highAlpha",
                        "lowBeta", "highBeta", "lowGamma", "highGamma"
                    ]
                    brain_data = {name: float(value) for name, value in zip(feature_names, latest_tcp_data)}

                    # 데이터프레임 생성
                    data = np.array(latest_tcp_data, dtype=float).reshape(1, -1)
                    data_df = pd.DataFrame(data, columns=feature_names)

                    # 모델 예측
                    predictions = model.predict(data_df)
                    prediction_response = {
                        "brain": brain_data,
                        "predictions": {
                            "attention": predictions.iloc[0]["attention"],
                            "meditation": predictions.iloc[0]["meditation"],
                            "classification": "NORMAL" if predictions.iloc[0]["classification"] == 0 else "ASLEEP",
                        }
                    }
                    # 응답 전송
                    await websocket.send_json({"response": True})
                    await websocket.send_json(prediction_response)
                else:
                    # TCP 데이터가 없을 때
                    await websocket.send_json({"response": False})
                    await websocket.close(code=1001, reason="No TCP data available")
            else:
                # 잘못된 메시지 처리
                await websocket.send_json({"response": False})
                await websocket.close(code=1001, reason="Invalid WebSocket message")
    except WebSocketDisconnect:
        print("WebSocket client disconnected.")
    finally:
        websocket_clients.remove(websocket)


async def handle_tcp_connection(reader, writer):
    global tcp_data_available, latest_tcp_data  # TCP 상태 및 데이터 저장 변수
    try:
        while True:
            data = await reader.read(BUFFER_SIZE)
            if not data:
                tcp_data_available = False
                break

            tcp_data_available = True
            decoded_data = data.decode("utf-8").strip()
            print(f"Received from TCP: {decoded_data}", flush=True)

            # TCP 데이터를 배열로 변환
            latest_tcp_data = list(map(float, decoded_data.split(",")))
    except Exception as e:
        print(f"Error in TCP connection: {e}")
    finally:
        tcp_data_available = False
        latest_tcp_data = None
        writer.close()
        await writer.wait_closed()


async def start_tcp_server():
    server = await asyncio.start_server(handle_tcp_connection, TCP_IP, TCP_PORT)
    print(f"TCP Server listening on {TCP_IP}:{TCP_PORT}")
    async with server:
        await server.serve_forever()


@app.on_event("startup")
async def startup_event():
    asyncio.create_task(start_tcp_server())


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
