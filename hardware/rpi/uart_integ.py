import serial
import time
import struct

# 라즈베리 파이에서 UART 신호를 수신하기 위한 설정
# '/dev/ttyAMA0'는 라즈베리파이의 UART 포트 경로입니다.
ser = serial.Serial('/dev/ttyAMA0', baudrate=9600, timeout=1)

def send_uart_signal():
    # 장비 ID, ON/OFF, R, G, B, 밝기, flag, NC
    # flag 1 = 수동, 0 = 자동
    uart_array = [1, 3, 255, 0, 0, 0, 0, 0]
    uart_bytes = struct.pack(f'{len(uart_array)}B', *uart_array)
    ser.write(uart_bytes)
    print(f"Sent array via UART: {uart_array}")

if __name__ == "__main__":
    try:
        send_uart_signal()  # 프로그램 시작 시 신호를 한 번만 전송
    except KeyboardInterrupt:
        print("Program interrupted by user.")
    finally:
        ser.close()

