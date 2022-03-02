import os
import logging
from logging import Formatter, FileHandler
import cv2
from PIL import Image
import numpy as np
import flask
import requests
import io
from io import BytesIO
from io import StringIO
import json
import base64
from flask import Flask, request, render_template, jsonify
from flask_cors import CORS
from imageio import imread
import pytesseract
import pan_read
pytesseract.pytesseract.tesseract_cmd=r'C:\Users\VIN1177-Sathamhussia\AppData\Local\Programs\Tesseract-OCR\tesseract.exe'
 
# from ocrNew import process_image
_VERSION = 1  # API version
app = Flask(__name__)
cors = CORS(app, resources={r"/v1/*": {"origins": "*"}})

# ROUTE HANDLER
# @app.route("/")
# def index():
# return render_template('python-file-upload.html')
    
@app.route('/v{}/ocr'.format(_VERSION), methods=["POST"])
def ocr():
    if request.method == 'POST':
        encoded_data = request.json['base64'].split(',')[1]
        img = imread(io.BytesIO(base64.b64decode(encoded_data)))        
        img = cv2.resize(img, (424, 304))
        img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)
        readLines = pytesseract.image_to_string(img)
        data = pan_read.pan_read_data(readLines)
        return data

if __name__ == "__main__":
    app.run(port=8000,debug=True)