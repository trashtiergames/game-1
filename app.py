from flask import Flask, render_template, request
from random import sample

app = Flask(__name__)

ENCOUNTER_NAMES = {
    1: "bakery.html",
    2: ["A2", "B2", "C2", "D2", "E2"],
    3: ["A3", "B3", "C3", "D3", "E3"]
}

ENCOUNTER_PREVIEWS = {
    "bakery.html": "I wonder if that empty bakery I found a while ago has some food...",
    "A2": "Find a brick",
    "B2": "Pet a cat",
    "C2": "Escape a zombie",
    "D2": "Decide between food and water",
    "E2": "Lose both food and water",
    "A3": "Fight two zombies",
    "B3": "Find some water",
    "C3": "Fall into a trap",
    "D3": "Program a data visualization",
    "E3": "Wonder what's in that old library"
}

@app.route("/")
def landing():
    return render_template("landing.html")

@app.route("/choose")
def choose():
    day = request.args.get("day")
    print("Day:", day)
    if int(day) == 1:
        encounter = {ENCOUNTER_NAMES[1]: ENCOUNTER_PREVIEWS[ENCOUNTER_NAMES[1]]} 
        return render_template("choose.html", encounters=encounter)

    encounter_names = ENCOUNTER_NAMES[int(day)]
    filenames_to_remove = request.args.get("filenamesToRemove").split()
    if filenames_to_remove:
        for filename in filenames_to_remove:
            if filename in encounter_names:
                encounter_names.remove(filename)
    
    name_selection = sample(encounter_names, 3)
    encounters = {
        name_selection[0]: ENCOUNTER_PREVIEWS[name_selection[0]],
        name_selection[1]: ENCOUNTER_PREVIEWS[name_selection[1]],
        name_selection[2]: ENCOUNTER_PREVIEWS[name_selection[2]],
    }
    return render_template("choose.html", encounters=encounters)

@app.route("/hideout")
def hideout():
    return render_template("hideout.html")

@app.route("/encounter")
def encounter():
    filename = request.args.get("filename")
    return render_template(filename, filename=filename)
    # return render_template(filename)

@app.route("/opening")
def opening():
    return render_template("opening.html")

@app.route("/game-over")
def gameOver():
    reason = request.args.get("reason")
    return render_template("game-over.html", reason=reason)

if __name__ == "__main__":
    app.run(debug=True, use_reloader=True)