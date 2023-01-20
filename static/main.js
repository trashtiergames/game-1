// Manage inventory and some game logic

const restartBtn = document.getElementById("restart-btn")

// Die if needed
if ((localStorage.getItem("hunger") > 99) & (!restartBtn)) {
    window.open("/game-over?reason=hunger", "_self")
}

if ((localStorage.getItem("thirst") > 99) & (!restartBtn)) {
    window.open("/game-over?reason=thirst", "_self")
}

// Save consumed encounters
if (filenameToRemove) {
    let namelist = localStorage.getItem("filenamesToRemove")
    namelist += filenameToRemove + " "
    localStorage.setItem("filenamesToRemove", namelist)
    localStorage.setItem("encounters", Number(localStorage.getItem("encounters")) + 1)
}

// If there's a start button, initialize (even before click lol)
const startBtn = document.getElementById("start-btn")
if (startBtn) {
    initializeResources()
}

const chooseBtn = document.getElementById("choose-btn")
if (chooseBtn) {
    chooseBtn.addEventListener("click", () => {
        let url = "/choose?day=" + localStorage.getItem("day")
        url += "&filenamesToRemove=" + localStorage.getItem("filenamesToRemove")
        url += "&encounters=" + localStorage.getItem("encounters")
        window.open(url, "_self")
    })
}

// If there's a dinner div (in hideout), eat and drink if possible
dinnerEl = document.getElementById("dinner")
if (dinnerEl) {
    foodText = document.createElement("p")
    foodText.innerHTML = checkFood()

    waterText = document.createElement("p")
    waterText.innerHTML = checkWater()

    dinnerEl.append(foodText)
    dinnerEl.append(waterText)

    localStorage.setItem("encounters", 0)
    localStorage.setItem("day", Number(localStorage.getItem("day")) + 1)
}

// Translate inventory from storage to offcanvas
updateOffcanvasInventory()

// If health value needs to be displayed, get it from local storage
healthValueEl = document.getElementById("hunger-value")
if (healthValueEl) {
    healthValueEl.innerHTML = localStorage.getItem("hunger")
}

// If sanity value needs to be displayed, get it from local storage
sanityValueEl = document.getElementById("thirst-value")
if (sanityValueEl) {
    sanityValueEl.innerHTML = localStorage.getItem("thirst")
}

function disableEncounterButtons() {
    // All buttons with this class are used for choices in encounters
    btns = document.getElementsByClassName("btn-outline-dark")
    for (const btn of btns) {
        btn.disabled = true
    }
}

function linkButton(id, url) {
    btn = document.getElementById(id)
    if (btn) {
        if (id === "choose-btn") {
            let specialUrl = "/choose?day=" + localStorage.getItem("day")
            specialUrl += "&filenamesToRemove=" + localStorage.getItem("filenamesToRemove")
            specialUrl += "&encounters=" + localStorage.getItem("encounters")
            btn.addEventListener("click", () => {
                window.open(specialUrl, "_self")   
            })
        } else {
            btn.addEventListener("click", () => {
                window.open(url, "_self")
            })
        }
    }
}

function addToInventory(item, n) {
    if (item === "food") {
        localStorage.setItem("foods", 
            Number(localStorage.getItem("foods")) + n)
    } 
    else if (item === "water") {
        localStorage.setItem("waters", 
            Number(localStorage.getItem("waters")) + n)
    }
    else if (item === "brick") {
        localStorage.setItem("bricks", 
            Number(localStorage.getItem("bricks")) + n)
    }
    else if (item === "cookies") {
        localStorage.setItem("cookies", 
            Number(localStorage.getItem("cookies")) + n)
    }
}

// Buttons for encounters
cookieBtn = document.getElementById("cookie-btn")
if (cookieBtn) {
    cookieBtn.addEventListener("click", () => {
        let newPar = document.createElement("p")
        newPar.innerHTML = "You open the door and find a batch of freshly baked cookies on the table. No time to think, grab the cookies and run!"
        
        document.getElementById("main-container").append(newPar)

        addToInventory("cookies", 1)
        updateOffcanvasInventory()

        disableEncounterButtons()
        appendHideoutButton("Run back to hideout")
    })
}

doorBtn = document.getElementById("door-btn")
if (doorBtn) {
    let newPar = document.createElement("p")
    doorBtn.addEventListener("click", () => {
        if (hasBricks()) {
            newPar.innerHTML = "Wow! I knew a brick could solve my problem! Looks like there's some food and water behind this door. Nice!"
            addToInventory("food", 1)
            addToInventory("water", 1)
        } else {
            newPar.innerHTML = "The door won't budge. Guess it's time to go back out and try my luck elsewhere."
        }
        document.getElementById("main-container").append(newPar)
        appendChooseButton("Go back outside")
    })
}

tradeBtn = document.getElementById("trade-btn")
if (tradeBtn) {
    if (Number(localStorage.getItem("foods")) < 1) {
        tradeBtn.disabled = true
    }
    tradeBtn.addEventListener("click", () => {
        let newPar = document.createElement("p")
        newPar.innerHTML = "I traded some food for water with them."
        document.getElementById("main-container").append(newPar)

        addToInventory("water", 1)
        addToInventory("food", -1)
        updateOffcanvasInventory()

        disableEncounterButtons()
        appendChooseButton("I'll take my leave")
    })
}

noTradeBtn = document.getElementById("no-trade-btn")
if (noTradeBtn) {
    noTradeBtn.addEventListener("click", () => {
        let newPar = document.createElement("p")
        newPar.innerHTML = "This is not a trade I'm looking for right now. They still offer me a little sip of water. I wonder if they actually have the right strategy for this world."
        document.getElementById("main-container").append(newPar)

        localStorage.setItem("thirst", Number(localStorage.getItem("thirst") - 10))

        disableEncounterButtons()
        appendChooseButton("I'll take my leave")
    })
}

rhBtn = document.getElementById("rh-door-btn")
if (rhBtn) {
    rhBtn.addEventListener("click", () => {
        let newPar = document.createElement("p")
        newPar.innerHTML = "The zombie that stumbles towards me is surprisingly nimble, but not as much as the ones that turned when they were younger. I manage to rip parts off it fairly easily and enter the room, which has a small supply of water left"
        document.getElementById("main-container").append(newPar)

        addToInventory("water", 2)
        updateOffcanvasInventory()

        disableEncounterButtons()
        appendChooseButton("Time to go before I get company.")
    })
}

outBtn = document.getElementById("rh-out-btn")
if (outBtn) {
    outBtn.addEventListener("click", () => {
        let newPar = document.createElement("p")
        newPar.innerHTML = "Better not risk it."
        document.getElementById("main-container").append(newPar)

        disableEncounterButtons()
        appendChooseButton("Time to go.")
    })
}

foundBrickEl = document.getElementById("found-brick")
if (foundBrickEl) {
    addToInventory("brick", 1)
    updateOffcanvasInventory()
}

foundFoodEl = document.getElementById("found-food")
if (foundFoodEl) {
    addToInventory("food", 1)
    updateOffcanvasInventory()
}

linkButton("zombie-door-btn", "/game-over?reason=zombies")
linkButton("hideout-btn", "/hideout")


function checkFood() {
    // Get first food element or undefined if there are none
    let food = Number(localStorage.getItem("foods"))
    let cookies = Number(localStorage.getItem("cookies"))
    if (food) {
        localStorage.setItem("foods", 
            Number(localStorage.getItem("foods")) - 1)
        return "Yum yum I love food."
    } else if (cookies) {
        localStorage.setItem("cookies", 
            Number(localStorage.getItem("cookies")) - 1)
        return "Yum yum I love cookies."
    } else {
        localStorage.setItem("hunger", 
            Number(localStorage.getItem("hunger")) + 20)
        return "Ah crap, can't believe I'm all out of food."
    }
}

function checkWater() {
    let water = Number(localStorage.getItem("waters"))
    if (water) {
        localStorage.setItem("waters", 
            Number(localStorage.getItem("waters")) - 1)
        return "<em>glug glug glug</em>"
    } else {
        localStorage.setItem("thirst", 
            Number(localStorage.getItem("thirst")) + 30)
        return "I wish I had some water. So thirsty."
    }
} 

function hasBricks() {
    let bricks = Number(localStorage.getItem("bricks"))
    if (bricks) {
        localStorage.setItem("bricks", 
            Number(localStorage.getItem("waters")) - 1)
        return true
    } else {
        return false
    }
}

function addItemCardtoInventory(item, n) {
    let inventory = document.getElementById("inventory-content")
    for (let i = 0; i < n; i++) {
        let cardEl = document.createElement("div")
        cardEl.className = `card my-3 ${item}`
        let rowEl = document.createElement("div")
        rowEl.className = "row g-0"
        let leftColEl = document.createElement("div")
        leftColEl.className = "col-4"
        let imgEl = document.createElement("img")
        imgEl.src = `${item}.png`
        imgEl.className = "img-fluid rounded-start p-1"
        let rightColEl = document.createElement("div")
        rightColEl.className = "col-8"
        let cardBodyEl = document.createElement("div")
        cardBodyEl.className = "card-body"
        let cardTitleEl = document.createElement("h5")
        cardTitleEl.className = "card-title"
        let bodyTextEl = document.createElement("p")
        bodyTextEl.className = "card-text"

        if (item === "food") {
            cardTitleEl.innerHTML = "Food"
            bodyTextEl.innerHTML = "You need to eat at the end of the day or you'll get hungrier."
        } 
        else if (item === "water") {
            cardTitleEl.innerHTML = "Water"
            bodyTextEl.innerHTML = "If you don't drink by the end of the day, you'll get thirstier."
        }
        else if (item === "brick") {
            cardTitleEl.innerHTML = "Brick"
            bodyTextEl.innerHTML = "The most useful item in a zombie apocalypse."
        }
        else if (item === "cookies") {
            cardTitleEl.innerHTML = "Cookies"
            bodyTextEl.innerHTML = "By clicking the button, you gave the website consent to use cookies."
        }

        cardBodyEl.append(cardTitleEl)
        cardBodyEl.append(bodyTextEl)
        rightColEl.append(cardBodyEl)
        leftColEl.append(imgEl)
        rowEl.append(leftColEl)
        rowEl.append(rightColEl)
        cardEl.append(rowEl)
        inventory.append(cardEl)
    }
}

function updateOffcanvasInventory() {
    let inventory = document.getElementById("inventory-content")
    while (inventory & inventory.lastChild) {
        inventory.removeChild(inventory.lastChild);
    }
    if (inventory) {
        addItemCardtoInventory("food", Number(localStorage.getItem("foods")))
        addItemCardtoInventory("water", Number(localStorage.getItem("waters")))
        addItemCardtoInventory("brick", Number(localStorage.getItem("bricks")))
        addItemCardtoInventory("cookies", Number(localStorage.getItem("cookies")))
    }
}

function appendHideoutButton(buttonText) {
    let newBtn = document.createElement("button")
    newBtn.className = "btn btn-outline-dark d-block mb-2"
    newBtn.type = "button"
    newBtn.id = "hideout-btn"
    newBtn.innerHTML = buttonText
    document.getElementById("main-container").append(newBtn)
    linkButton("hideout-btn", "/hideout")
}

function appendChooseButton(buttonText) {
    let newBtn = document.createElement("button")
    newBtn.className = "btn btn-outline-dark d-block mb-2"
    newBtn.type = "button"
    newBtn.id = "choose-btn"
    newBtn.innerHTML = buttonText
    document.getElementById("main-container").append(newBtn)
    linkButton("choose-btn", "/choose")
}

function initializeResources() {
    localStorage.clear()
    localStorage.setItem("hunger", 30)
    localStorage.setItem("thirst", 20)
    localStorage.setItem("day", 1)
    localStorage.setItem("filenamesToRemove", " ")
    localStorage.setItem("foods", 0)
    localStorage.setItem("waters", 0)
    localStorage.setItem("cookies", 0)
    localStorage.setItem("bricks", 0)
    localStorage.setItem("encounters", 0)
    console.log("initialized.")
}
