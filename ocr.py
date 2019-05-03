import pytesseract

def run_ocr(image)->str:
	"""Take an image path, extract character values out of it
		and save the results in .txt"""

	ocrOutput = pytesseract.image_to_string(image)
	print(ocrOutput)
	return ocrOutput
