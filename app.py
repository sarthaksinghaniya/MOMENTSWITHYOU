# app.py (Flask backend)
from flask import Flask, render_template, url_for
import os

app = Flask(__name__)

@app.route("/")
def home():
    images_folder = os.path.join("static", "images")
    images = sorted([f for f in os.listdir(images_folder) if f.lower().endswith(('jpg', 'jpeg', 'png'))])

    with open("romantic_lines.txt", "r", encoding="utf-8") as f:
        content = f.read()
        lines = [para.strip() for para in content.split('\n\n') if para.strip()]

    return render_template("index.html", images=images, lines=lines)

if __name__ == "__main__":
    app.run(debug=True)
