// Manage inventory and some game logic

// Die if needed
if (localStorage.getItem("hunger") > 99) {
    window.open("/game-over?reason=hunger", "_self")
}

if (localStorage.getItem("thirst") > 99) {
    window.open("/game-over?reason=thirst", "_self")
}

// If there's a start button, listen for click to initialize
const startBtn = document.getElementById("start-btn")
if (startBtn) {
    startBtn.addEventListener("click", initializeResources())
}

const chooseBtn = document.getElementById("choose-btn")
if (chooseBtn) {
    chooseBtn.addEventListener("click", () => {
        window.open("/choose?day=" + localStorage.getItem("day"), "_self")
    })
}

function initializeResources() {
    localStorage.setItem("hunger", 30)
    localStorage.setItem("thirst", 20)
    localStorage.setItem("day", 1)
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
}

function checkFood() {
    // Get first food element or undefined if there are none
    food = document.getElementsByClassName("food")[0]
    if (food) {
        food.remove()
        return "Yum yum"
    } else {
        localStorage.setItem("hunger", Number(localStorage.getItem("hunger")) + 20)
        return "Aw fuck I'm starving"
    }
}

function checkWater() {
    water = document.getElementsByClassName("water")[0]
    if (water) {
        water.remove()
        return "Slurrrrrppp"
    } else {
        localStorage.setItem("thirst", Number(localStorage.getItem("thirst")) + 30)
        return "I wish I had some water"
    }
} 

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
