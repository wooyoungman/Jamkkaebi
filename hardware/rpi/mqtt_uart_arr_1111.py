import time
import json
import struct
import serial
from gpiozero import DistanceSensor
import paho.mqtt.client as mqtt
import threading

# MQTT 설정
mqtt_broker = "192.168.100.104"
mqtt_port = 1883
mqtt_topic = "sensor/data"      # 데이터를 송신할 토픽
control_topic = "command/data"  # 데이터를 수신할 토픽

client = mqtt.Client()
#client.username_pw_set(username="rpi5", password="ssafyi11C102!!")

cnt = 0
uart_command = "off"  # on/off 신호 저장 변수

# 라즈베리 파이에서 UART 신호를 수신하기 위한 설정
ser = serial.Serial('/dev/ttyAMA0', baudrate=9600, timeout=1)

def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print("Connected with result code " + str(rc))
        client.subscribe(mqtt_topic)  # 데이터를 수신할 토픽을 구독합니다.
    else:
        print("Failed to connect, return code " + str(rc))

def on_disconnect(client, userdata, rc):
    print("Disconnected with result code " + str(rc))

def on_message(client, userdata, msg):
    # 메시지 수신 시 호출되는 콜백 함수입니다.
    print(f"Received message: {msg.topic} -> {msg.payload.decode()}")
    # 수신한 메시지를 UART로 전송
    try:
        ser.write(msg.payload)
        print(f"Sent via UART: {msg.payload.decode()}")
    except Exception as e:
        print(f"Failed to send via UART: {e}")

def read_uart():
    global cnt, uart_command
    while True:
        if ser.in_waiting > 0:  # 수신된 데이터가 있는지 확인
            try:
                # 모든 수신된 데이터 읽기
                data = ser.readline().decode('utf-8').strip()  # 라인 단위로 읽기
                if data:
                    adc_value = int(data)  # 데이터를 정수로 변환
                    print(f"Received ADC Value: {adc_value}")  # 수신된 데이터 출력

                    # 받은 UART 데이터를 MQTT로 발행
                    cnt += 1
                    if adc_value > 500:
                        uart_command = "on"
                    else:
                        uart_command = "off"

                    payload = {
                        'test': cnt,
                        'adc_value': adc_value,
                        'distance_cm': cnt * 100,  # 예시 데이터 (cm로 변환)
                        'uart_command': uart_command
                    }
                    client.publish(mqtt_topic, json.dumps(payload), qos=1)
                    print(f"Published via MQTT: {payload}")

                    # UART로 on/off 신호 전송
                    if uart_command == "on":
                        uart_array = [1, 2, 3, 4, 5, 6, 7, 8]  # 예시 배열 데이터
                        uart_bytes = struct.pack(f'{len(uart_array)}B', *uart_array)
                        ser.write(uart_bytes)
                        print(f"Sent array via UART: {uart_array}")
                    else:
                        ser.write(b'b')
                        print("Sent: off")
            except ValueError:
                print(f"Received non-integer data: {data}")  # 비정수 데이터 오류 처리
            except UnicodeDecodeError:
                print("Error decoding data")  # 디코딩 오류 처리
        time.sleep(0.1)  # 데이터를 읽는 간격 줄임

client.on_connect = on_connect
client.on_disconnect = on_disconnect
client.on_message = on_message

# MQTT 브로커에 연결
try:
    client.connect(mqtt_broker, mqtt_port, 60)
    client.loop_start()
except Exception as e:
    print(f"Could not connect to MQTT Broker: {e}")
    exit()

# UART 데이터 읽기 스레드 시작
uart_thread = threading.Thread(target=read_uart)
uart_thread.daemon = True
uart_thread.start()

# 센서 데이터 수집 및 MQTT 발행
# 기존 cnt 변수를 사용하지 않도록 수정
try:
    while True:
        # 센서 데이터 수집 및 발행
        distance = cnt * 100  # 예시 데이터 (cm로 변환)
        payload = {
            'distance_cm': round(distance, 2),
            'uart_command': uart_command
        }
        # 데이터를 송신할 토픽에 발행
        client.publish(mqtt_topic, json.dumps(payload), qos=1)
        print(f"Published: {payload}")
        time.sleep(1)

except KeyboardInterrupt:
    print("종료")

finally:
    # MQTT 연결 종료
    client.disconnect()
    client.loop_stop()
    ser.close()

