import os
import tkinter as tk
from tkinter import *
from tkinter import Entry, filedialog
import requests
# from tkinter.filedialog import askopenfilename

win = tk.Tk()
win.title("Welcome to Enzo")
win.configure(background='#2f4f4f')
win.geometry("700x600")
win.resizable(False, False)


def open_file_gui():
    file_path = filedialog.askopenfilename()
    url = 'http://127.0.0.1:5000/'
    files = {'img': open(file_path, 'rb')}
    r = requests.post(url, files=files)
    print(r)
    print(r.text)
    print(file_path)


OpenFile = Button(text="Open File", command=open_file_gui, width=30,
                  activebackground="black", activeforeground="green").pack()


win.mainloop()
