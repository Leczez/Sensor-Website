#!/usr/bin/env python3

from w1thermsensor import W1ThermSensor
import os

sensor = W1ThermSensor()
file = open("ThePool", "w")

while True:
    file.write(str(sensor.get_temperature()))




