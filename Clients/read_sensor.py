from w1thermsensor import W1ThermSensor
import socket

port = 25565
host = "192.168.0.111"

connection = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
connection.connect(host, port)

sensor = W1ThermSensor()

sensors = []
sensors = sensor.get_available_sensors()

for sensor in sensors:
    connection.send(sensor.get_temperature())





