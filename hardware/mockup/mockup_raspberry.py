import paho.mqtt.client as mqtt
import json
import time
import random
import csv
import os

# RabbitMQ MQTT configuration
HOST = "k11c106.p.ssafy.io"
PORT = 1883
UUID = "***REMOVED*** "
TOPIC = f"device/{UUID}/data"

# The MQTT topic is constructed as: exchange_name/routing_key
MQTT_TOPIC = f"{TOPIC}"

# Create a MQTT client instance
client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2)


def on_connect(client, userdata, flags, reason_code, properties):
    if reason_code != 0:
        print("Connection failed with code", reason_code)


def on_publish(client, userdata, mid, reason_code, properties):
    print("Message Published")


# CSV 파일 설정
script_dir = os.path.dirname(os.path.abspath(__file__))
file_path = os.path.join(script_dir, "total_data.csv")

try:
    csvfile = open(file_path, "r", encoding="utf-8")
    reader = csv.reader(csvfile)
    next(reader)  # 첫 번째 행 건너뛰기 (헤더)

except FileNotFoundError:
    print(f"파일을 찾을 수 없습니다: {file_path}")
    exit()

except Exception as e:
    print(f"파일을 여는 중 에러 발생: {e}")
    exit()


# Set the callbacks
client.on_connect = on_connect
client.on_publish = on_publish

# Connect to the broker
client.username_pw_set(username="***REMOVED*** ", password="***REMOVED*** ")
client.connect(HOST, PORT)

# Start the loop
client.loop_start()

# Wait for the connection to be established
time.sleep(1)

while True:
    try:
        row = next(reader)
        print(f"Read row from CSV: {row}")

        # CSV 행 데이터를 payload에 매핑
        message = {
            "uuid": "***REMOVED*** ",
            "driverId": 5,
            "driverStatus": row[10],
            "coordinateX": float(row[12]),
            "coordinateY": float(row[11]),
            "emg": random.randint(0, 4095),
            "eeg": {
                "delta": float(row[2]),
                "theta": float(row[3]),
                "lowAlpha": float(row[4]),
                "highAlpha": float(row[5]),
                "lowBeta": float(row[6]),
                "highBeta": float(row[7]),
                "lowGamma": float(row[8]),
                "highGamma": float(row[9]),
            },
            "score": {"attention": int(row[0]), "meditation": int(row[1])},
        }

    except StopIteration:
        print("CSV 파일의 모든 데이터를 읽었습니다.")
        # 파일 포인터를 처음으로 되돌리거나 종료할 수 있습니다.
        # 여기서는 파일을 다시 처음부터 읽도록 설정
        csvfile.seek(0)
        next(reader)  # 헤더 건너뛰기
        continue  # 다음 루프로 넘어감

    except Exception as e:
        print(f"CSV 데이터 처리 중 에러 발생: {e}")

    # message = {
    #     "uuid": "***REMOVED*** ",
    #     "driverId": 5,
    #     "driverStatus": "NORMAL" if random.randint(0, 1) else "ASLEEP",
    #     "coordinateX": random.uniform(-180, 180),
    #     "coordinateY": random.uniform(-90, 90),
    #     "emg": random.randint(0, 4095),
    #     "eeg": {
    #         "delta": random.uniform(1000, 10000),
    #         "theta": random.uniform(1, 100),
    #         "lowAlpha": random.uniform(1, 20),
    #         "highAlpha": random.uniform(1, 20),
    #         "lowBeta": random.uniform(1, 50),
    #         "highBeta": random.uniform(1, 50),
    #         "lowGamma": random.uniform(1, 100),
    #         "highGamma": random.uniform(1000, 5000),
    #     },
    #     "score": {
    #         "attention": random.randint(0, 100),
    #         "meditation": random.randint(0, 100),
    #     },
    # }

    # message =  {
    #     "uuid": "***REMOVED*** ",
    #     "driverId": 5,
    #     "driverStatus": None,
    #     "coordinateX": 126.3549225,
    #     "coordinateY": 34.7574628,
    #     "emg": 123,
    #     "eeg": {
    #         "delta": None,
    #         "theta": None,
    #         "lowAlpha": None,
    #         "highAlpha": None,
    #         "lowBeta": None,
    #         "highBeta": None,
    #         "lowGamma": None,
    #         "highGamma": None,
    #     },
    #     "score": {"attention": None, "meditation": None},
    # }

    # Convert the message to JSON
    payload = json.dumps(message)

    # Publish the message
    result = client.publish(MQTT_TOPIC, payload)

    # Check if the message is published
    status = result[0]
    if status == 0:
        print(f"Message sent to topic `{MQTT_TOPIC}`")
    else:
        print(f"Failed to send message to topic {MQTT_TOPIC}")

    # Wait a moment for the message to be published
    time.sleep(1)
    # break

# Disconnect from the broker
client.loop_stop()
client.disconnect()
