from flask import Flask, request, Response
import os
from barcode_read import run
from ocr import run_ocr
import cv2

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
    if len(decoded_obj) > 0:
        return decoded_obj[0].data
    else:
        return "Sorry can find the barcode can you retake a more clear image"


# ocr api
@app.route('/ocr', methods=['POST'])
def ocr_api():
    image = request.files['img']

    image.save(os.path.join(app.config['UPLOAD_FOLDER'], "down.jpg"))

    img = cv2.imread('down.jpg')
    text = run_ocr(img)
    pos = text.find('EXP')
    date = text[pos-2: pos] + text[pos+1: pos+3]
    print(text)
    return date

# start flask app
app.run(debug=True)

# to run this on local: FLASK_APP=flask_api.py flask run --host=0.0.0.0
