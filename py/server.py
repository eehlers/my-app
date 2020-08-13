
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

@app.route("/install/<foo>")
@cross_origin()
def install(foo):
    app.logger.info(foo)
    import base64
    foo2=base64.b64decode(foo)
    app.logger.info(foo2)
    foo3=foo2.decode("ascii")
    app.logger.info(foo3)
    app.logger.info("*********app.logger.info()***************")
    from cs.install import f
    f(app.logger, foo3)
    return "install complete"

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

