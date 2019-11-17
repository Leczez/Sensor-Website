#!/usr/bin/env python3
# client py
import socket

port = 25565
host = "192.168.0.111"

connection = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
connection.connect((host, port))
file = open("ThePool", "r")

while True:
    message = file.read()
    message += "Hus:"
    connection.send(message.encode("utf-8"))
    print(message)


file.close()
