import time
import json
import struct
import serial
import paho.mqtt.client as mqtt
import threading

# 기존 MQTT 설정 (_server 추가)
mqtt_broker_server = "k11c106.p.ssafy.io"
mqtt_port_server = 1883
mqtt_topic_server = "device/***REMOVED*** /data"      # 데이터를 송신할 토픽
control_topic_server = "device/***REMOVED*** /control"  # 데이터를 수신할 토픽

client_server = mqtt.Client()
client_server.username_pw_set(username="***REMOVED*** ", password="***REMOVED*** ")

# 새로운 MQTT 설정 (_pc 추가)
mqtt_broker_pc = "192.168.100.104"
mqtt_port_pc = 1883
mqtt_topic_pc = "your/pc/data/topic"  # 데이터를 송신할 토픽 (적절히 변경 필요)
control_topic_pc = "your/pc/control/topic"  # 데이터를 수신할 토픽 (적절히 변경 필요)

client_pc = mqtt.Client()
# 필요한 경우 사용자명과 비밀번호 설정
# client_pc.username_pw_set(username="your_username", password="your_password")

driverId = 1
driverStatus = "NORMAL"
cordX = 123
cordY = 123

# 라즈베리 파이에서 UART 신호를 수신하기 위한 설정
ser = serial.Serial('/dev/ttyAMA0', baudrate=9600, timeout=1)

# 기존 MQTT 클라이언트의 콜백 함수들 (_server 추가)
def on_connect_server(client, userdata, flags, rc):
    if rc == 0:
        print("Server MQTT 연결 성공")
        client.subscribe(control_topic_server)  # 데이터를 수신할 토픽 구독
    else:
        print("Server MQTT 연결 실패, 코드:", rc)

def on_disconnect_server(client, userdata, rc):
    print("Server MQTT 연결 해제, 코드:", rc)

def on_message_server(client, userdata, msg):
    print(f"Server MQTT 수신 메시지: {msg.topic} -> {msg.payload.decode()}")
    try:
        payload = json.loads(msg.payload.decode())
        print(f"Server MQTT 수신 페이로드: {payload}")
        uart_array = [
            payload.get('target', 0),
            payload.get('control', 0),
            payload.get('red', 0),
            payload.get('green', 0),
            payload.get('blue', 0),
            payload.get('brightness', 0),
            int(payload.get('adnormal', 0)),
            payload.get('value8', 0)
        ]
        uart_bytes = struct.pack(f'{len(uart_array)}B', *uart_array)
        ser.write(uart_bytes)
        print(f"UART로 전송된 배열: {uart_array}")
    except json.JSONDecodeError:
        print("Server MQTT 메시지의 JSON 디코딩 실패")
    except Exception as e:
        print(f"UART 전송 실패: {e}")

# 새로운 MQTT 클라이언트의 콜백 함수들 (_pc 추가)
def on_connect_pc(client, userdata, flags, rc):
    if rc == 0:
        print("PC MQTT 연결 성공")
        client.subscribe(control_topic_pc)  # 데이터를 수신할 토픽 구독
    else:
        print("PC MQTT 연결 실패, 코드:", rc)

def on_disconnect_pc(client, userdata, rc):
    print("PC MQTT 연결 해제, 코드:", rc)

def on_message_pc(client, userdata, msg):
    print(f"PC MQTT 수신 메시지: {msg.topic} -> {msg.payload.decode()}")
    # 필요에 따라 추가 로직 구현

def read_uart_server():
    while True:
        if ser.in_waiting > 0:
            try:
                data = ser.readline().decode('utf-8').strip()
                if data:
                    emg_value = int(data)
                    print(f"수신된 ADC 값: {emg_value}")
                    payload = {
                        "driverId": driverId,
                        "driverStatus": driverStatus,
                        "coordinateX": cordX,
                        "coordinateY": cordY,
                        "emg": emg_value,
                    }
                    # 두 MQTT 브로커로 데이터 발행
                    client_server.publish(mqtt_topic_server, json.dumps(payload), qos=1)
                    print(f"Server MQTT로 발행된 데이터: {payload}")
                    client_pc.publish(mqtt_topic_pc, json.dumps(payload), qos=1)
                    print(f"PC MQTT로 발행된 데이터: {payload}")
            except ValueError:
                print(f"정수가 아닌 데이터 수신: {data}")
            except UnicodeDecodeError:
                print("데이터 디코딩 오류")
        time.sleep(1)  # 데이터 읽는 간격 조절

# 기존 MQTT 클라이언트 설정
client_server.on_connect = on_connect_server
client_server.on_disconnect = on_disconnect_server
client_server.on_message = on_message_server

# 새로운 MQTT 클라이언트 설정
client_pc.on_connect = on_connect_pc
client_pc.on_disconnect = on_disconnect_pc
client_pc.on_message = on_message_pc

# MQTT 브로커에 연결
try:
    client_server.connect(mqtt_broker_server, mqtt_port_server, 60)
    client_server.loop_start()

    client_pc.connect(mqtt_broker_pc, mqtt_port_pc, 60)
    client_pc.loop_start()
except Exception as e:
    print(f"MQTT 브로커 연결 실패: {e}")
    exit()

# UART 데이터 읽기 스레드 시작
uart_thread_server = threading.Thread(target=read_uart_server)
uart_thread_server.daemon = True
uart_thread_server.start()

# 메인 루프
try:
    while True:
        time.sleep(1)
except KeyboardInterrupt:
    print("프로그램 종료")
finally:
    # MQTT 연결 종료
    client_server.disconnect()
    client_server.loop_stop()
    client_pc.disconnect()
    client_pc.loop_stop()
    ser.close()
