import serial
import socket

# 시리얼 포트 설정
SERIAL_PORT = 'COM6'  # 아두이노 연결 포트
BAUD_RATE = 115200
ser = serial.Serial(SERIAL_PORT, BAUD_RATE)

# TCP 클라이언트 설정
TCP_IP = 'k11c106.p.ssafy.io'
# k11c106.p.ssafy.io
TCP_PORT = 35552
# 35552
BUFFER_SIZE = 1024

# TCP 소켓 생성
client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
client_socket.connect((TCP_IP, TCP_PORT))
print("Connected to FastAPI TCP server")

try:
    while True:
        if ser.in_waiting:
            # 시리얼 데이터를 읽고 TCP로 전송
            data = ser.readline().decode('utf-8').strip()
            print(f"Sending to TCP: {data}")
            client_socket.send(data.encode())
except KeyboardInterrupt:
    print("Closing connections...")
    ser.close()
    client_socket.close()
