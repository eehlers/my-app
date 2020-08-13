
import sys, logging
from flask import Flask
from flask_cors import cross_origin

app = Flask(__name__)
handler = logging.StreamHandler(sys.stdout)
app.logger.addHandler(handler)
app.logger.setLevel(logging.INFO)

@app.route("/")
@cross_origin()
def hi():
    app.logger.info("hi")
    return "hi"

@app.route("/install/<fileName_b64>")
@cross_origin()
def install(fileName_b64):
    app.logger.info("Beginning install...")
    import base64
    fileName_bytes=base64.b64decode(fileName_b64)
    fileName_string=fileName_bytes.decode("ascii")
    app.logger.info(f"Installing file {fileName_string}...")
    from cs.install import f
    return f(app.logger, fileName_string)

@app.route("/sign")
@cross_origin()
def sign():
    from cs.sign import f
    f()

if __name__ == "__main__":
    app.run(host='127.0.0.1', port=5001)

