
import sys, logging
from flask import Flask
from flask_cors import cross_origin

app = Flask(__name__)
handler = logging.StreamHandler(sys.stdout)
app.logger.addHandler(handler)

@app.route("/")
@cross_origin()
def hi():
    app.logger.info("hi")
    return "hi"

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
    from cs.sign import f
    f()
    app.logger.info("sign1")
    return "sign"

if __name__ == "__main__":
    app.run(host='127.0.0.1', port=5001)

