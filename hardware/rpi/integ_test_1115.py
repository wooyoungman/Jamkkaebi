import time
import json
import struct
import serial
import paho.mqtt.client as mqtt
import threading
import csv
import os

# MQTT 설정
mqtt_broker = "k11c106.p.ssafy.io"
mqtt_port = 1883
mqtt_topic = "device/***REMOVED*** /data"      # 데이터를 송신할 토픽
control_topic = "device/***REMOVED*** /control"  # 데이터를 수신할 토픽
status_topic = "device/***REMOVED*** /status"    # 연결 상태 토픽

client = mqtt.Client()
client.username_pw_set(username="***REMOVED*** ", password="***REMOVED*** ")

# 라즈베리 파이에서 UART 신호를 수신하기 위한 설정
ser = serial.Serial('/dev/ttyAMA0', baudrate=9600, timeout=1)

# CSV 파일 설정
script_dir = os.path.dirname(os.path.abspath(__file__))
file_path = os.path.join(script_dir, 'total_data.csv')

# CSV 파일 열기 및 읽기 준비
try:
    csvfile = open(file_path, 'r', encoding='utf-8')
    reader = csv.reader(csvfile)
    next(reader)  # 첫 번째 행 건너뛰기 (헤더)

except FileNotFoundError:
    print(f"파일을 찾을 수 없습니다: {file_path}")
    exit()

except Exception as e:
    print(f"파일을 여는 중 에러 발생: {e}")
    exit()

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

def read_uart(csv_reader):
    while True:
        if ser.in_waiting > 0:
            try: 
                data = ser.readline().decode('utf-8').strip()

                if data:
                    emg_value = int(data)
                    print(f"Received ADC Value: {emg_value}")

                    # CSV 파일에서 다음 행 읽기
                    try:
                        row = next(csv_reader)
                        print(f"Read row from CSV: {row}")

                        # CSV 행 데이터를 payload에 매핑
                        payload = {
                            "uuid": "***REMOVED*** ",
                            "driverId": 5,
                            "driverStatus": row[10],
                            "coordinateX": float(row[12]),
                            "coordinateY": float(row[11]),
                            "emg": emg_value,
                            "eeg": {
                                "delta": float(row[2]),
                                "theta": float(row[3]),
                                "lowAlpha": float(row[4]),
                                "highAlpha": float(row[5]),
                                "lowBeta": float(row[6]),
                                "highBeta": float(row[7]),
                                "lowGamma": float(row[8]),
                                "highGamma": float(row[9])
                            },
                            "score": {
                                "attention": int(row[0]),
                                "meditation": int(row[1])
                            }
                        }

                        client.publish(mqtt_topic, json.dumps(payload), qos=1)
                        print(f"Published via MQTT: {payload}")

                    except StopIteration:
                        print("CSV 파일의 모든 데이터를 읽었습니다.")
                        # 파일 포인터를 처음으로 되돌리거나 종료할 수 있습니다.
                        # 여기서는 파일을 다시 처음부터 읽도록 설정
                        csvfile.seek(0)
                        next(csv_reader)  # 헤더 건너뛰기
                        continue  # 다음 루프로 넘어감

                    except Exception as e:
                        print(f"CSV 데이터 처리 중 에러 발생: {e}")

            except ValueError:
                print(f"Received non-integer data: {data}")

            except UnicodeDecodeError:
                print("Error decoding data")

        #time.sleep(0.1)  # 너무 빠른 반복을 방지

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
uart_thread = threading.Thread(target=read_uart, args=(reader,))
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
    csvfile.close()  # CSV 파일 닫기
