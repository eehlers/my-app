
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
    app.logger.info("Ready.")
    return "Ready."

@app.route("/install/<firmware>/<sig0>/<sig1>/<sig2>/<fileName_b64>")
@cross_origin()
def install(firmware, sig0, sig1, sig2, fileName_b64):
    app.logger.info("Installing app...")
    signatures = [sig0, sig1, sig2]
    import base64
    fileName_bytes=base64.b64decode(fileName_b64)
    fileName_string=fileName_bytes.decode("ascii")
    app.logger.info(f"Installing file {fileName_string}...")
    from cs.install import f
    return f(app.logger, firmware, signatures, fileName_string)

@app.route("/sign/<psbt_b64>")
@cross_origin()
def sign(psbt_b64):
    app.logger.info("Signing PSBT...")
    import base64
    psbt_bytes=base64.b64decode(psbt_b64)
    psbt_string=psbt_bytes.decode("ascii")
    from cs.sign import f
    return f(app.logger, psbt_string)

if __name__ == "__main__":
    app.run(host='127.0.0.1', port=5001)

