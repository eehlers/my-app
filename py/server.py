
import sys, logging
from flask import Flask
from flask_cors import cross_origin
from calculator.simple import SimpleCalculator

def calcOp(text):
	"""based on the input text, return the operation result"""
	try:
		c = SimpleCalculator()
		c.run(text)
		return c.log[-1]
	except Exception as e:
		print(e)
		return 0.0

app = Flask(__name__)
handler = logging.StreamHandler(sys.stdout)
app.logger.addHandler(handler)

@app.route("/")
@cross_origin()
def hi():
    app.logger.info("hi")
    return "hi"

@app.route("/calc/<input>")
@cross_origin()
def calc(input):
    app.logger.info("calc")
    return calcOp(input)

@app.route("/install")
@cross_origin()
def install():
    app.logger.info("install")
    from cs.install import f
    f()
    return "install"

@app.route("/sign")
@cross_origin()
def sign():
    app.logger.info("sign0")
    app.logger.info("sign1")
    return "sign"

if __name__ == "__main__":
    app.run(host='127.0.0.1', port=5001)

