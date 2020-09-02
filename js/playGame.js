//variables
let columnNo
let speed
let hits = 0
let miss = 0
let correctColumn
let isMuted
let time
let firstValues
let secondValues
let isPaused
let countDown
let calculateTime
const urlString = window.location.href
let isLoad = parseInt(urlString.charAt(urlString.length-1))

//functions
//loads the audio
const loadAudio = () => {
    if (localStorage.hasOwnProperty("audio")) {
        let audio = JSON.parse(localStorage.getItem("audio"))
        document.querySelector("audio").currentTime = audio.audioTime    
        document.querySelector("audio").play  
        if (audio.isMuted) {
            isMuted = true
            document.querySelector("audio").muted = true 
            document.querySelector(".img-audio").src = "../images/mute.png"
        }  
        else {
            isMuted = false
            document.querySelector("audio").muted = false 
            document.querySelector(".img-audio").src = "../images/volume.png"
        }
    }
}

//updates the audio
const updateAudio = () => {
    let audio = {
        audioTime: document.querySelector("audio").currentTime,
        isMuted: isMuted
    }
    localStorage.setItem("audio", JSON.stringify(audio))
}

//on load funtion
const onLoad = () => {
    isPaused = false
    document.querySelector(".cannon").style.gridColumn = 3
    columnNo = 3
}

//generates the speed for invaders
const generateSpeed = () => {
    speed = new Array(5)
    for (let i = 0; i < 5; i++) {
        speed[i] = Math.floor(Math.random() * 10)
    }
}

//shows the values on invaders and cannon
const showValues = () => {
    firstValues = new Array(5)
    secondValues = new Array(5)
    for (let index = 0; index < 5; index++) {
        firstValues[index] = Math.floor(Math.random() * 24) + 1
    }
    for (let index = 0; index < 5; index++) {
        secondValues[index] = Math.floor(Math.random() * 8) + 1
    }
    let allh3 = document.querySelectorAll(".ufo h3")
    allh3.forEach((h3, index) => {
        h3.innerText = `${firstValues[index]} + ${secondValues[index]}`
    })
    correctColumn = Math.floor(Math.random() * 5)
    correctAnswer = firstValues[correctColumn] + secondValues[correctColumn]
    document.querySelector(".cannon h3").innerText = correctAnswer
}

//resets the positions of invaders
const resetUfo = () => {
    generateSpeed()
    let ufos = document.querySelectorAll(".ufo .img-objects")
    let imageDiv = document.querySelectorAll(".ufo")
        ufos.forEach((ufo, index) => {
            imageDiv[index].style.marginTop = `2%`
        })
}

//increase the counter of invaders and changes the positions
const increaseCounter = (minutes) => {
    if (isLoad === 0) {
        generateSpeed()
        showValues()
        time = 90
    }
    const cannonStop = document.querySelector(".cannon").getBoundingClientRect().top
    countDown = setInterval(() => {
        let ufos = document.querySelectorAll(".ufo .img-objects")
            let imageDiv = document.querySelectorAll(".ufo")
            ufos.forEach((ufo, index) => {
                speed[index] += Math.random() * 10
                imageDiv[index].style.marginTop = `${speed[index]}%`
                const ufoStop = ufo.getBoundingClientRect().bottom
                if (ufoStop >= cannonStop) {
                    clearInterval(countDown)
                    clearInterval(calculateTime)
                    finishGame()
                    
                }
            })
            const verticalLine = document.querySelector(".vertical-line")
            if (verticalLine != undefined) {
                verticalLine.remove()
            }
    }, minutes)
    calculateTime = setInterval(() => {
        time -= 1
        if (time <= 0) {
            clearInterval(countDown)
            clearInterval(calculateTime)
            finishGame()
        }
        else {
            document.querySelector(".cannon h2").innerText = `${time}`
        }
    }, 1000)
    document.querySelector(".cannon h2").innerText = `${time}`
    document.querySelector(".hits").innerText = `${hits}`
    document.querySelector(".miss").innerText = `${miss}`
}

//shows the laser when the player presses space bar
const showFire = () => {
    const cannonStop = document.querySelector(".cannon").getBoundingClientRect().top
    let ufos = document.querySelectorAll(".ufo .img-objects")
    const ufoStop = ufos[columnNo-1].getBoundingClientRect().bottom
    let div = document.createElement("div")
    div.setAttribute("class", "vertical-line")
    div.style.height = `${cannonStop - ufoStop}px`
    const right = document.querySelector(".cannon").getBoundingClientRect().right
    const left = document.querySelector(".cannon").getBoundingClientRect().left
    div.style.marginLeft = `${(right-left)/2}px`
    document.querySelectorAll(".ufo")[columnNo-1].appendChild(div)
}

//moves the cannon when keyboard arrows are pressed
const moveCannon = (event) => {
    let cannon = document.querySelector(".cannon")
    if (! isPaused) {
        if (event.code === "ArrowRight") {
            if (columnNo === 5) {
                cannon.style.gridColumn = 1
                columnNo = 1
            }
            else {
                columnNo += 1
                cannon.style.gridColumn = columnNo
            }
        }
        else if (event.code === "ArrowLeft") {
            if (columnNo === 1) {
                cannon.style.gridColumn = 5
                columnNo = 5
            }
            else {
                columnNo -= 1
                cannon.style.gridColumn = columnNo
            }
        }
        else if (event.code === "Space") {
            showFire()
            if (correctColumn + 1 === columnNo) {
                hits += 1
                showValues()
                resetUfo()
            }
            else {
                miss += 1
                showValues()
            }
            document.querySelector(".hits").innerText = `${hits}`
            document.querySelector(".miss").innerText = `${miss}`
        }
    }
}

//saves the game
const saveGame = () => {
    updateAudio()
    const game = {
        columnNo: columnNo,
        correctColumn: correctColumn,
        time: time,
        hits: hits,
        miss: miss,
        speed: speed, 
        firstValues: firstValues,
        secondValues: secondValues
    }
    localStorage.setItem("game", JSON.stringify(game))
}

//loads the saved game
const loadGame = () => {
    if (isLoad === 1) {
        const jsonData = JSON.parse(localStorage.getItem("game"))
        columnNo = jsonData.columnNo
        correctColumn = jsonData.correctColumn
        hits = jsonData.hits
        miss = jsonData.miss
        time = jsonData.time
        speed = jsonData.speed
        firstValues = jsonData.firstValues
        secondValues = jsonData.secondValues
        document.querySelector(".cannon").style.gridColumn = columnNo
        let allh3 = document.querySelectorAll(".ufo h3")
        allh3.forEach((h3, index) => {
            h3.innerText = `${firstValues[index]} + ${secondValues[index]}`
        })
        let correctAnswer = firstValues[correctColumn] + secondValues[correctColumn]
        document.querySelector(".cannon h3").innerText = correctAnswer
    }
    else {
        onLoad()
    }
    if (localStorage.getItem("difficultyLevel") === "Easy") {
        increaseCounter(500)
    }
    else {
        increaseCounter(300)
    }
    loadAudio()
}

//finishes the game
const finishGame = () => {
    localStorage.removeItem("game")
    updateAudio()
    const gameSummary = {
        hits: hits,
        miss: miss,
    }
    localStorage.setItem("gameSummary", JSON.stringify(gameSummary))
    window.location.replace("../html/gameSummary.html")
}

//functions on load event of the page
loadGame()

//click listeners
//keyboard key pressed event
window.addEventListener("keydown", moveCannon)

//click event of the audio icon
document.querySelector(".img-audio").addEventListener("click", () => {
    if (isMuted === false) {
        document.querySelector(".img-audio").src = "../images/mute.png"
        isMuted = true
        document.querySelector("audio").muted = true        
    }
    else {
        document.querySelector(".img-audio").src = "../images/volume.png"
        isMuted = false
        document.querySelector("audio").muted = false
    }
    updateAudio()
})

//click event of the back icon
document.querySelector(".img-back").addEventListener("click", () => {
    updateAudio()
    window.location.replace("../html/home.html")
})

//click event of the save icon
document.querySelector(".img-save").addEventListener("click", () => {
    saveGame()
    window.location.replace("../index.html?savedGame=1")
})

//click event of the status icon
document.querySelector(".img-status").addEventListener("click", () => {
    updateAudio()
    if (isPaused) {
        document.querySelector(".img-status").src = '../images/pause.png'
        isLoad = 1
        loadGame()
        isPaused = false
    }
    else {
        document.querySelector(".img-status").src = '../images/play.png'
        saveGame()
        clearInterval(countDown)
        clearInterval(calculateTime)
        isPaused = true
    }
})

//click event of the quit icon
document.querySelector(".img-quit").addEventListener("click", () => {
    updateAudio()
    localStorage.removeItem("name")
    localStorage.removeItem("difficultyLevel")
    localStorage.removeItem("game")
    window.location.replace("../index.html")
})
