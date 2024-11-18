import time
from gpiozero import DistanceSensor
import math
import paho.mqtt.client as mqtt

# MQTT 설정
mqtt_broker = "192.168.100.104"  # 예: "localhost" 또는 브로커의 올바른 호스트 이름/주소
mqtt_port = 1883
mqtt_topic = "sensor/data"

client = mqtt.Client()

cnt = 0

def on_connect(client, userdata, flags, rc):
    print("Connected with result code " + str(rc))

client.on_connect = on_connect
client.connect(mqtt_broker, mqtt_port, 60)

try:
    while True:
        # 센서 데이터 MQTT로 전송

        cnt = cnt + 1
        payload = {
            'test': cnt 
        }
        client.publish(mqtt_topic, str(payload))
        print(f"Published: {payload}")

        time.sleep(1)

except KeyboardInterrupt:
    print("종료")

finally:
    client.disconnect()
