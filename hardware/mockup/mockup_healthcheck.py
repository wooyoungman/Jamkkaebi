import paho.mqtt.client as mqtt

# RabbitMQ MQTT configuration
HOST = "k11c106.p.ssafy.io"
PORT = 1883
UUID = "***REMOVED***"
TOPIC = f"device/{UUID}/status"

# The MQTT topic is constructed as: exchange_name/routing_key
MQTT_TOPIC = f"{TOPIC}"

# Create a MQTT client instance
client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2)


def on_connect(client, userdata, flags, reason_code, properties):
    if reason_code == 0:
        client.subscribe(MQTT_TOPIC)
        print(f"Connected and subscribed to {MQTT_TOPIC}")
    else:
        print("Connection failed with code", reason_code)


def on_publish(client, userdata, mid, reason_code, properties):
    print("Message Published")


def on_message(client, userdata, msg):
    if msg.topic == MQTT_TOPIC and str(msg.payload.decode()) == "HEALTH_CHECK":
        try:
            # Publish the message
            result = client.publish(MQTT_TOPIC, "HEALTHY")

            # Check if the message is published
            status = result[0]
            if status == 0:
                print(f"Message sent to topic `{MQTT_TOPIC}`")
            else:
                print(f"Failed to send message to topic {MQTT_TOPIC}")
        except RuntimeError:
            print(f"Error on message publish")


# Set the callbacks
client.on_connect = on_connect
client.on_publish = on_publish
client.on_message = on_message

# Connect to the broker
client.username_pw_set(username="***REMOVED***", password="***REMOVED***")
client.connect(HOST, PORT)

# Start the loop
client.loop_forever()
