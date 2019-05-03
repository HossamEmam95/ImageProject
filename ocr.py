import os
import string
import argparse
import datefinder
import pytesseract

def run_ocr(image)->str:
	"""Take an image path, extract character values out of it
		and save the results in .txt"""

	ocrOutput = pytesseract.image_to_string(image)
	print(ocrOutput)
	return ocrOutput

if __name__ == '__main__':
	ap = argparse.ArgumentParser()
	ap.add_argument("-i", "--image", required = True,
	help = "path to the image file")
	args = vars(ap.parse_args())
	run_ocr(args['image'])
