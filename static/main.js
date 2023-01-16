// Manage inventory and some game logic

// This should actually only happen in the beginning
const startBtn = document.getElementById("start-btn")
if (startBtn) {
    startBtn.addEventListener("click", initializeResources())
}

function initializeResources() {
    localStorage.setItem("health", 50)
    localStorage.setItem("sanity", 60)
}

healthValueEl = document.getElementById("health-value")
if (healthValueEl) {
    healthValueEl.innerHTML = localStorage.getItem("health")
}

sanityValueEl = document.getElementById("sanity-value")
if (sanityValueEl) {
    sanityValueEl.innerHTML = localStorage.getItem("sanity")
}

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
        localStorage.setItem("health", localStorage.getItem("health") - 10)
        localStorage.setItem("sanity", localStorage.getItem("sanity") - 20)
        return "Aw fuck I'm starving"
    }
}

function checkWater() {
    water = document.getElementsByClassName("water")[0]
    if (water) {
        water.remove()
        return "Slurrrrrppp"
    } else {
        localStorage.setItem("health", localStorage.getItem("health") - 30)
        localStorage.setItem("sanity", localStorage.getItem("sanity") - 10)
        return "I wish I had some water"
    }
} 