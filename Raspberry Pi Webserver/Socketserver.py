#!/usr/bin/env python3
import time
import socket

HOST = "192.168.0.111"
PORT = 25565

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.bind((HOST, PORT))
    s.listen()
    print("Server up and listening")
    while True:

        connection, addr = s.accept()
        with connection:
            print("Connection established with ", addr)
            data = (connection.recv(4096))
            print(data.decode("utf-8"))
            data = data.decode("utf-8").split(",")
            huset = "Temperatur i poolen: " + data[0] + " Celsius"
            husvagnen = "Batteri: " + data[1] + " %"
            try:
                with open("Huset.txt", "w") as f1:
                    f1.write(huset)
                    print(huset)
                    connection.send("1".encode("utf-8"))  # skrivningen lyckades
            except OSError:
                # time.sleep(2)
                connection.send("0".encode("utf-8"))  # skrivningen misslyckades
            # open("Huset.txt","w") as f1:
            # f1.write(huset)

            try:
                with open("Husvagnen.txt", "w") as f2:
                    f2.write(husvagnen)
                    connection.send("1".encode("utf-8"))  # Överförningen lyckades.
            except OSError:
                # time.sleep(2)
                connection.send("0".encode("utf-8")) # skicka igen
        # with open("Husvagnen.txt","w") as f2:
        # f2.write(husvagnen)

    # while True:
    #	data = connection.recv(1024)
    # with open("index.html") as f:

    #	if data == "":
    #		break

