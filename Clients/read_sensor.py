from ds18b20 import DS18B20
import os

sensor = DS18B20()
file = open("ThePool", "w")

while True:
    file.write(str(sensor.get_temperature()))




