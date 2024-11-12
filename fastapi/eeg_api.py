# from fastapi import FastAPI, WebSocket
# import serial
# import numpy as np
# import pandas as pd
# import joblib
# from unified_model import UnifiedModel  # UnifiedModel 가져오기
# import asyncio

# # FastAPI 앱 생성
# app = FastAPI()

# # 모델과 시리얼 포트 초기화 변수
# model = None
# ser = None

# @app.on_event("startup")
# async def startup_event():
#     """애플리케이션 시작 시 실행할 초기화 코드"""
#     global model, ser

#     # 모델 로드
#     model = joblib.load("unified_model2.pkl")

#     # 시리얼 포트 초기화
#     try:
#         ser = serial.Serial('COM6', 115200)
#     except serial.SerialException as e:
#         print(f"Serial initialization failed: {e}")
#         raise e

# @app.on_event("shutdown")
# async def shutdown_event():
#     """애플리케이션 종료 시 실행할 정리 코드"""
#     global ser
#     if ser and ser.is_open:
#         ser.close()

# # WebSocket 엔드포인트
# @app.websocket("/ws")
# async def websocket_endpoint(websocket: WebSocket):
#     """WebSocket 통신 처리"""
#     await websocket.accept()
#     global model, ser

#     try:
#         while True:
#             # 시리얼 데이터 읽기
#             line = ser.readline().decode('utf-8').strip()
#             data_values = line.split(',')

#             # 입력 데이터가 올바른 형식인지 확인
#             if len(data_values) == 8:  # features 개수 확인
#                 # 데이터를 NumPy 배열로 변환
#                 data = np.array(data_values, dtype=float).reshape(1, -1)
#                 data_df = pd.DataFrame(data, columns=[
#                     'delta', 'theta', 'lowAlpha', 'highAlpha', 'lowBeta', 'highBeta', 'lowGamma', 'highGamma'
#                 ])

#                 # 모델 예측
#                 predictions = model.predict(data_df)
#                 response = {
#                     "attention": round(predictions.iloc[0]['attention'], 2),
#                     "meditation": round(predictions.iloc[0]['meditation'], 2),
#                     "classification": "Awake" if predictions.iloc[0]['classification'] == 0 else "Sleep"
#                 }

#                 # WebSocket으로 예측 결과 전송
#                 await websocket.send_json(response)

#             await asyncio.sleep(0.5)  # 1초에 2번 전송
#     except Exception as e:
#         print(f"WebSocket Error: {e}")
from fastapi import FastAPI, WebSocket
import serial
import numpy as np
import pandas as pd
import joblib
from unified_model import UnifiedModel  # UnifiedModel 가져오기
import asyncio

# FastAPI 앱 생성
app = FastAPI()

# 모델과 시리얼 포트 초기화 변수
model = None
ser = None

@app.on_event("startup")
async def lifespan(app: FastAPI):
    """Lifespan 핸들러: 앱의 시작과 종료 이벤트 처리"""
    global model, ser

    # 애플리케이션 시작 시 초기화 코드
    print("Initializing application...")
    model = joblib.load("C:/Users/SSAFY/Desktop/EEG_Test/unified_model2.pkl")
    ser = serial.Serial('COM6', 115200)

    yield

    # 애플리케이션 종료 시 정리 코드
    print("Shutting down application...")
    if ser and ser.is_open:
        ser.close()

# WebSocket 엔드포인트
@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    """WebSocket 통신 처리"""
    await websocket.accept()
    global model, ser

    try:
        while True:
            # 시리얼 데이터 읽기
            line = ser.readline().decode('utf-8').strip()
            data_values = line.split(',')

            # 입력 데이터가 올바른 형식인지 확인
            if len(data_values) == 8:  # features 개수 확인
                # 데이터를 NumPy 배열로 변환
                data = np.array(data_values, dtype=float).reshape(1, -1)
                data_df = pd.DataFrame(data, columns=[
                    'delta', 'theta', 'lowAlpha', 'highAlpha', 'lowBeta', 'highBeta', 'lowGamma', 'highGamma'
                ])

                # 모델 예측
                predictions = model.predict(data_df)
                response = {
                    "attention": round(predictions.iloc[0]['attention'], 2),
                    "meditation": round(predictions.iloc[0]['meditation'], 2),
                    "classification": "Awake" if predictions.iloc[0]['classification'] == 0 else "Sleep"
                }

                # WebSocket으로 예측 결과 전송
                await websocket.send_json(response)

            await asyncio.sleep(0.5)  # 500ms 대기 (1초에 2번 전송)
    except Exception as e:
        print(f"WebSocket Error: {e}")
