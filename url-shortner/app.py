from flask import Flask, request, redirect, render_template
import sqlite3
import string
import random

app = Flask(__name__)

# -------------------
# DATABASE SETUP
# -------------------
def get_db():
    return sqlite3.connect("urls.db")

with get_db() as conn:
    conn.execute("""
        CREATE TABLE IF NOT EXISTS urls (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            original_url TEXT NOT NULL,
            short_code TEXT UNIQUE NOT NULL
        )
    """)

# -------------------
# HELPERS
# -------------------
def generate_short_code(length=6):
    characters = string.ascii_letters + string.digits
    return ''.join(random.choice(characters) for _ in range(length))

# -------------------
# ROUTES
# -------------------
@app.route("/", methods=["GET", "POST"])
def index():
    short_url = None

    if request.method == "POST":
        original_url = request.form["url"]
        short_code = generate_short_code()

        with get_db() as conn:
            conn.execute(
                "INSERT INTO urls (original_url, short_code) VALUES (?, ?)",
                (original_url, short_code)
            )

        short_url = request.host_url + short_code

    return render_template("index.html", short_url=short_url)

@app.route("/<short_code>")
def redirect_url(short_code):
    with get_db() as conn:
        result = conn.execute(
            "SELECT original_url FROM urls WHERE short_code = ?",
            (short_code,)
        ).fetchone()

    if result:
        return redirect(result[0])

    return "URL not found", 404

# -------------------
if __name__ == "__main__":
    app.run(debug=True)
