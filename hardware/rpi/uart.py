import serial
import time

# 라즈베리 파이에서 UART 신호를 수신하기 위한 설정
# '/dev/ttyAMA0'는 라즈베리파이의 UART 포트 경로입니다.
ser = serial.Serial('/dev/ttyAMA0', baudrate=9600, timeout=1)


def read_uart():
    while True:
        if ser.in_waiting > 0:  # 수신된 데이터가 있는지 확인
            try:
                # 모든 수신된 데이터 읽기
                data = ser.readline().decode('utf-8').strip()  # 라인 단위로 읽기
                if data:
                    adc_value = int(data)  # 데이터를 정수로 변환
                    print(f"Received ADC Value: {adc_value}")  # 수신된 데이터 출력

                    # 받은 값이 500을 넘으면 'on', 이하면 'off' 신호를 전송
                    if adc_value > 500:
                        ser.write(b'a')
                        print("Sent: on")
                    else:
                        ser.write(b'b')
                        print("Sent: off")
            except ValueError:
                print(f"Received non-integer data: {data}")  # 비정수 데이터 오류 처리
            except UnicodeDecodeError:
                print("Error decoding data")  # 디코딩 오류 처리
        time.sleep(0.1)  # 데이터를 읽는 간격 줄임


if __name__ == "__main__":
    try:
        read_uart()
    except KeyboardInterrupt:
        print("Program interrupted by user.")
    finally:
        ser.close()

