import serial
import time

ser = serial.Serial('/dev/ttyAMA0', 9600, timeout=1)

while True:
    ser.write(b'a')  # 'a' 전송: LED 켜기 명령
    time.sleep(1)
    ser.write(b'b')  # 'b' 전송: LED 끄기 명령
    time.sleep(1)
    print("Sent a and b")

