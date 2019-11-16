# client py
import socket

port = 25565
host = "192.168.0.111"

connection = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
connection.connect((host, port))

file = open("ThePool", "r")

while connection.send(file):
    print(file)

file.close()