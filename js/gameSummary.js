//variables
let isMuted

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

//shows the game summary score
const showGameScore = () => {
    const name = localStorage.getItem("name")
    const difficultyLevel = localStorage.getItem("difficultyLevel")
    const jsonData = JSON.parse(localStorage.getItem("gameSummary"))
    const hits = jsonData.hits
    const miss = jsonData.miss
    document.querySelector("#player-name").innerText = name
    document.querySelector("#difficulty-level").innerText = difficultyLevel
    document.querySelector("#hits").innerText = hits
    document.querySelector("#miss").innerText = miss
}

//functions on load event of the page
showGameScore()
loadAudio()

//click listeners
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

//click event of the home icon
document.querySelector(".img-home").addEventListener("click", () => {
    updateAudio()
    localStorage.removeItem("gameSummary")
    localStorage.removeItem("name")
    localStorage.removeItem("difficultyLevel")
    window.location.replace("../index.html")
})