
import sys, logging
from flask import Flask
from flask_cors import cross_origin

app = Flask(__name__)
handler = logging.StreamHandler(sys.stdout)
app.logger.addHandler(handler)
app.logger.setLevel(logging.DEBUG)

@app.route("/")
@cross_origin()
def hi():
    app.logger.info("hi")
    return "hi"

@app.route("/install/<fileName>")
@cross_origin()
def install(fileName):
    app.logger.info(fileName)
    import base64
    fileName_bytes=base64.b64decode(fileName)
    app.logger.info(fileName_bytes)
    fileName_string=fileName_bytes.decode("ascii")
    app.logger.info(fileName_string)
    app.logger.info("*********app.logger.info()***************")
    from cs.install import f
    return f(app.logger, fileName_string)

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

