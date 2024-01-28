import sys
from flask import Flask
from flask_cors import CORS


app = Flask(
    __name__,
    static_url_path='',
    static_folder='ui/src')

CORS(app)


@app.route("/")
def hello():
    return "Hello World from Flask!"


@app.route("/files")
def get_files():
    import pathlib
    import os
    cwd = pathlib.Path(os.getcwd())

    pngs = list(cwd.rglob("*.png"))
    pdfs = list(cwd.rglob("*.pdf"))
    jpgs = list(cwd.rglob("*.jpg"))
    txts = list(cwd.rglob("*.txt"))
    paths = list(pngs + pdfs + jpgs + txts)
    return [str(path) for path in paths]


@app.route("/categories")
def get_categories():
    return [
        "Politics", "Religion", "Rhetoric", "Tech", "Finance", "Gaming"
    ]


if __name__ == "__main__":
    app.run(host='127.0.0.1', port=5000)
