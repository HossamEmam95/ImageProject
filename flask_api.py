from flask import Flask, request, Response
import os
from barcode_read import run
import numpy as np
import cv2

# Initialize the Flask application
app = Flask(__name__)
folder = './'
app.config['UPLOAD_FOLDER'] = folder

# route http posts to this method
@app.route('/', methods=['POST'])
def test():
    image = request.files['image']

    image.save(os.path.join(app.config['UPLOAD_FOLDER'], "down.jpg"))

    img = cv2.imread('down.jpg')
    decoded_obj = run(img)
    print(decoded_obj[0].data)
    return "hi"

# start flask app
app.run(debug=True, host= '0.0.0.0')
# to run this on local: FLASK_APP=flask_api.py flask run --host=0.0.0.0
