from fastapi import FastAPI, WebSocket
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

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    websocket_clients.append(websocket)
    try:
        while True:
            await websocket.receive_text()
    except Exception as e:
        print(f"WebSocket Error: {e}")
    finally:
        websocket_clients.remove(websocket)

async def handle_tcp_connection(reader, writer):
    try:
        while True:
            data = await reader.read(BUFFER_SIZE)
            if not data:
                break
            decoded_data = data.decode("utf-8").strip()
            print(f"Received from TCP: {decoded_data}", flush=True)

            data_values = decoded_data.split(",")
            if len(data_values) == 8:
                # 매핑 데이터 이름과 값
                feature_names = [
                    "delta", "theta", "lowAlpha", "highAlpha",
                    "lowBeta", "highBeta", "lowGamma", "highGamma"
                ]
                brain_data = {name: float(value) for name, value in zip(feature_names, data_values)}

                # 데이터프레임 생성
                data = np.array(data_values, dtype=float).reshape(1, -1)
                data_df = pd.DataFrame(data, columns=feature_names)
                
                # 예측
                predictions = model.predict(data_df)
                response = {
                    "brain": brain_data,  # 데이터 이름과 값 매핑된 JSON
                    "predictions": {
                        "attention": predictions.iloc[0]["attention"],
                        "meditation": predictions.iloc[0]["meditation"],
                        "classification": "NORMAL" if predictions.iloc[0]["classification"] == 0 else "ASLEEP",
                    }
                }
                for client in websocket_clients:
                    try:
                        await client.send_json(response)
                    except Exception as e:
                        print(f"Error sending data to WebSocket: {e}")
    except Exception as e:
        print(f"Error in TCP connection: {e}")
    finally:
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
