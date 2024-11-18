import time
import json
from gpiozero import DistanceSensor
import paho.mqtt.client as mqtt

# MQTT 설정
mqtt_broker = "192.168.100.104"
mqtt_port = 1883
mqtt_topic = "sensor/data"      # 데이터를 송신할 토픽
control_topic = "command/data"  # 데이터를 수신할 토픽

client = mqtt.Client()
#client.username_pw_set(username="rpi5", password="ssafyi11C102!!")

cnt = 0

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

try:
    while True:
        # 센서 데이터 수집 및 발행
        cnt += 1
        distance = cnt * 100  # 예시 데이터 (cm로 변환)
        payload = {
            'test': cnt,
            'distance_cm': round(distance, 2)
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

