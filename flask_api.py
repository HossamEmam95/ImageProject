from flask import Flask, request, Response
import os
from barcode_read import run
from ocr import run_ocr
import cv2
import re
import json

# Initialize the Flask application
app = Flask(__name__)
folder = './'
app.config['UPLOAD_FOLDER'] = folder

# barcode api
@app.route('/barcode', methods=['POST'])
def barcode():
    image = request.files['img']

    image.save(os.path.join(app.config['UPLOAD_FOLDER'], "down.jpg"))

    img = cv2.imread('down.jpg')
    decoded_obj = run(img)
    try:
        return json.dumps(int(decoded_obj[0].data))
    except:
        return json.dumps("Sorry can't find the barcode can you retake a more clear image")


# ocr api
@app.route('/ocr', methods=['POST'])
def ocr_api():
    image = request.files['img']

    image.save(os.path.join(app.config['UPLOAD_FOLDER'], "down.jpg"))

    img = cv2.imread('down.jpg')
    text = run_ocr(img)
    # pos = text.find('EXP')
    # target = text[pos: pos+10]
    # pos = target.find("/")
    # date = target[pos-2: pos] + target[pos+1: pos+3]
    print(text)
    date = ""
    try:
        date = re.search(r'[0-9]+/[0-9]+', text).group()
        text2 = text[text.find(date) + 3:]
        try:
            date = re.search(r'[0-9]+/[0-9]+', text2).group()
        except:
            pass
    except:
        return json.dumps("sorry can't read date please retake image")
    return json.dumps(date)

# start flask app
app.run(debug=True, host=0.0.0.0)

# to run this on local: FLASK_APP=flask_api.py flask run --host=0.0.0.0
