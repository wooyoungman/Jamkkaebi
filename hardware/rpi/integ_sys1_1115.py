import time
import json
import struct
import serial
from gpiozero import DistanceSensor
import paho.mqtt.client as mqtt
import threading

# MQTT 설정
mqtt_broker = "k11c106.p.ssafy.io"
mqtt_port = 1883
mqtt_topic = "device/***REMOVED***/data"      # 데이터를 송신할 토픽
control_topic = "device/***REMOVED***/control"  # 데이터를 수신할 토픽
status_topic = "device/***REMOVED***/status"    # 연결 상태 토픽

client = mqtt.Client()
client.username_pw_set(username="***REMOVED***", password="***REMOVED***")

# 라즈베리 파이에서 UART 신호를 수신하기 위한 설정
ser = serial.Serial('/dev/ttyAMA0', baudrate=9600, timeout=1)

def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print("Connected with result code " + str(rc))
        client.subscribe(control_topic)  # 제어 토픽 구독
        client.subscribe(status_topic)   # 상태 토픽 구독
        
    else:
        print("Failed to connect, return code " + str(rc))

def on_disconnect(client, userdata, rc):
    print("Disconnected with result code " + str(rc))

def on_message(client, userdata, msg):
    print(f"Received message: {msg.topic} -> {msg.payload.decode()}")

    if msg.topic == control_topic:
        # 제어 토픽에서 수신된 메시지 처리
        try:
            payload = json.loads(msg.payload.decode())
            print(f"Received payload: {payload}")

            uart_array = [
                payload.get('target', 0),
                payload.get('control', 0),
                payload.get('red', 0),
                payload.get('green', 0),
                payload.get('blue', 0),
                payload.get('brightness', 0),
                int(payload.get('abnormal', 0)),
                payload.get('value8', 0),
            ]

            uart_bytes = struct.pack(f'{len(uart_array)}B', *uart_array)
            ser.write(uart_bytes)
            print(f"Sent array via UART: {uart_array}")

        except json.JSONDecodeError:
            print("Failed to decode JSON from MQTT message.")

        except Exception as e:
            print(f"Failed to send via UART: {e}")

    elif msg.topic == status_topic:
        # 상태 토픽에서 수신된 메시지 처리
        if msg.payload.decode() == "HEALTH_CHECK":
            try:
                result = client.publish(status_topic, "HEALTHY")
                status = result[0]

                if status == 0:
                    print(f"Sent 'HEALTHY' to topic `{status_topic}`")

                else:
                    print(f"Failed to send message to topic {status_topic}")

            except RuntimeError:
                print(f"Error on message publish")

        else:
            print(f"Received unexpected payload on status topic: {msg.payload.decode()}")

    else:
        print(f"Received message from unknown topic: {msg.topic}")

def read_uart():
    while True:
        if ser.in_waiting > 0:
            try: 
                data = ser.readline().decode('utf-8').strip()

                if data:
                    emg_value = int(data)
                    print(f"Received ADC Value: {emg_value}")

                    payload = {
                        "uuid": "***REMOVED***",  # 고정
                        "driverId": 5,  # 고정
                        "driverStatus": None,
                        "coordinateX": 126.3549225,
                        "coordinateY": 34.7574628,
                        "emg": emg_value,
                        "eeg": {
                            "delta": None,
                            "theta": None,
                            "lowAlpha": None,
                            "highAlpha": None,
                            "lowBeta": None,
                            "highBeta": None,
                            "lowGamma": None,
                            "highGamma": None
                        },
                        "score": {
                            "attention": None,
                            "meditation": None
                        }
                    }

                    client.publish(mqtt_topic, json.dumps(payload), qos=1)
                    print(f"Published via MQTT: {payload}")

            except ValueError:
                print(f"Received non-integer data: {data}")

            except UnicodeDecodeError:
                print("Error decoding data")

        #time.sleep(1)

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

# 메인 루프
try:
    while True:
        time.sleep(1)

except KeyboardInterrupt:
    print("종료")

finally:
    # MQTT 연결 종료
    client.disconnect()
    client.loop_stop()
    ser.close()
