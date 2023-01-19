from flask import Flask, render_template, request
from random import sample

app = Flask(__name__)

ENCOUNTER_NAMES = {
    1: "bakery.html",
    2: ["gas_station.html", 
        "metro.html", 
        "retirement_home.html", 
        "university.html", 
        "tower.html"],
    3: ["skyscraper.html", 
        "internet_cafe.html", 
        "lake.html", 
        "bowling.html", 
        "library.html"]
}

ENCOUNTER_PREVIEWS = {
    "bakery.html": "I wonder if that empty bakery I found a while ago has some food...",
    "gas_station.html": "Maybe my trap at the gas station worked.",
    "metro.html": "It's possible someone friendly is at the metro tunnel.",
    "retirement_home.html": "There are zombies at the retirement home, but they're slower and weaker.",
    "university.html": "Might be some corner in the university I haven't checked.",
    "tower.html": "I could climb the tower and survey the city",
    "skyscraper.html": "There's a menacing-looking skyscraper in the distance.",
    "internet_cafe.html": "Could find something in a fridge in the old internet café.",
    "lake.html": "The lake may no be of use, but it's calm at least.",
    "bowling.html": "I doubt the bowling alley has much to offer, but I can try.",
    "library.html": "Wonder what's in that old library."
}

@app.route("/")
def landing():
    return render_template("landing.html")

@app.route("/choose")
def choose():
    day = request.args.get("day")
    encounter_count = request.args.get("encounters")
    if int(encounter_count) > 2:
        return render_template("dark.html")
    elif int(day) == 1:
        encounter = {ENCOUNTER_NAMES[1]: ENCOUNTER_PREVIEWS[ENCOUNTER_NAMES[1]]} 
        return render_template("choose.html", encounters=encounter)
    elif int(day) == 4:
        return render_template("win.html")
    print(ENCOUNTER_NAMES)
    # Maybe this changes the dict in place instead of making a copy?
    encounter_names = [name for name in ENCOUNTER_NAMES[int(day)]]
    print(encounter_names)
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

@app.route("/opening")
def opening():
    return render_template("opening.html")

@app.route("/game-over")
def gameOver():
    reason = request.args.get("reason")
    return render_template("game-over.html", reason=reason)

if __name__ == "__main__":
    app.run(debug=True, use_reloader=True)