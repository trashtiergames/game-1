from flask import Flask, render_template, request

app = Flask(__name__)

@app.route("/")
def landing():
    return render_template("landing.html")

@app.route("/choose")
def choose():
    return render_template("choose.html")

@app.route("/hideout")
def hideout():
    return render_template("hideout.html")

@app.route("/encounter")
def encounter():
    return render_template("encounter.html")

@app.route("/opening")
def opening():
    return render_template("opening.html")

@app.route("/game-over")
def gameOver():
    reason = request.args.get("reason")
    return render_template("game-over.html", reason=reason)

    if reason:
        return render_template("game-over.html", reason=reason)
    else:
        return render_template("game-over.html")

if __name__ == "__main__":
    app.run(debug=True, use_reloader=True)