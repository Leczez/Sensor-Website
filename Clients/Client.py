#!/usr/bin/env python3
# client py
import socket

port = 25565
host = "192.168.0.111"

connection = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
connection.connect((host, port))

while True:
    file = open("ThePool", "r")
    connection.send("Hus:".encode("utf-8") + file.encode("utf-8"))
    print(file)
    file.close()

