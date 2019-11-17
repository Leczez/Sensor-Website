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
            data = data.decode("utf-8")

            if "Hus:" in data:
                Hus = data.strip(":")
                try:
                    with open("Huset.txt", "w") as f1:
                        f1.write(Hus[1])
                        print(Hus[1])
                except OSError:
                    # time.sleep(2)
                    print("Couldn't open text file")

            elif "Husvagn:" in data:
                Husvagn = data.split(":")
                try:
                    with open("Husvagnen.txt", "w") as f2:
                        f2.write(Husvagn[1])
                except OSError:
                    # time.sleep(2)
                    print("Couldn't open text file")


            #huset = "Temperatur i poolen: " + data[0] + " Celsius"
            #husvagnen = "Batteri: " + data[1] + " %"



        # with open("Husvagnen.txt","w") as f2:
        # f2.write(husvagnen)

    # while True:
    #	data = connection.recv(1024)
    # with open("index.html") as f:

    #	if data == "":
    #		break

