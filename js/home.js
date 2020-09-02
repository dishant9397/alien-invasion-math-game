//variables
let name
let difficultyLevel
let anchorTag
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

//functions on load event of the page
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

//click event of the name input
document.querySelector("#name").addEventListener("keyup", () => {
    name = document.querySelector("#name").value
    anchorTag = document.getElementById("link")
    if (name.length != 0) {
        anchorTag.removeAttribute("class")
        anchorTag.setAttribute("href", "../html/playGame.html?loadGame=0")
    }  
    else {
        anchorTag.setAttribute("class", "disabled")
        anchorTag.removeAttribute("href")
    }
})

//click event of link
document.querySelector("#link").addEventListener("click", () => {
    difficultyLevel = document.querySelector("#difficulty").value
    localStorage.setItem("name", name)
    localStorage.setItem("difficultyLevel", difficultyLevel)
})

//click event of the back icon
document.querySelector(".img-back").addEventListener("click", () => {
    updateAudio()
    window.location.replace("../index.html")
})