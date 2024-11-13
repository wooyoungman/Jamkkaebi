from fastapi import FastAPI, WebSocket
from contextlib import asynccontextmanager
import numpy as np
import pandas as pd
import joblib
import asyncio
import socket


@asynccontextmanager
async def lifespan(app: FastAPI):
    """FastAPI lifespan context manager"""
    asyncio.create_task(start_tcp_server())
    yield


app = FastAPI(lifespan=lifespan)
model = joblib.load("./unified_model2.pkl")

# TCP 서버 설정
TCP_IP = "127.0.0.1"
TCP_PORT = 9000
BUFFER_SIZE = 1024

# WebSocket 클라이언트 저장
websocket_clients = []


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    """WebSocket 클라이언트 통신"""
    await websocket.accept()
    websocket_clients.append(websocket)
    try:
        while True:
            await asyncio.sleep(1)  # WebSocket 연결 유지
    except Exception as e:
        print(f"WebSocket Error: {e}")
    finally:
        websocket_clients.remove(websocket)


async def handle_tcp_connection(conn):
    """TCP 연결에서 데이터 처리"""
    try:
        while True:
            data = await asyncio.to_thread(conn.recv, BUFFER_SIZE)
            if not data:
                break
            decoded_data = data.decode("utf-8").strip()
            print(f"Received from TCP: {decoded_data}")

            # 데이터 처리
            data_values = decoded_data.split(",")
            if len(data_values) == 8:
                data = np.array(data_values, dtype=float).reshape(1, -1)
                data_df = pd.DataFrame(
                    data,
                    columns=[
                        "delta",
                        "theta",
                        "lowAlpha",
                        "highAlpha",
                        "lowBeta",
                        "highBeta",
                        "lowGamma",
                        "highGamma",
                    ],
                )
                predictions = model.predict(data_df)
                response = {
                    "input_data": data_values,
                    "predictions": {
                        "attention": predictions.iloc[0]["attention"],
                        "meditation": predictions.iloc[0]["meditation"],
                        "classification": (
                            "Awake"
                            if predictions.iloc[0]["classification"] == 0
                            else "Drowsy"
                        ),
                    },
                }

                # WebSocket 클라이언트로 전송
                for client in websocket_clients:
                    try:
                        print(f"Sending data to WebSocket client: {response}")
                        await client.send_json(response)
                    except Exception as e:
                        print(f"Error sending data to WebSocket: {e}")

    except Exception as e:
        print(f"Error in TCP connection: {e}")
    finally:
        conn.close()


async def start_tcp_server():
    """TCP 서버 시작"""
    server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server_socket.bind((TCP_IP, TCP_PORT))
    server_socket.listen(5)
    print(f"TCP Server listening on {TCP_IP}:{TCP_PORT}")

    while True:
        conn, addr = await asyncio.to_thread(server_socket.accept)
        print(f"Connection established with {addr}")
        asyncio.create_task(handle_tcp_connection(conn))
