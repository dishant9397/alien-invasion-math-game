//variables
let isMuted

//functions
//function loads all the page data
const onLoad = () => {
    const urlString = window.location.href
    const isSaved = parseInt(urlString.charAt(urlString.length-1))
    if (isSaved === 1) {
        alert("Your game has been saved to the last checkpoint")
    }
    if (localStorage.hasOwnProperty("game")) {
        document.querySelector("#btn-load").disabled = false
        document.querySelector("#btn-load").removeAttribute("class")
    }
    else {
        document.querySelector("#btn-load").disabled = true
    }
}

//loads the audio
const loadAudio = () => {
    if (localStorage.hasOwnProperty("audio")) {
        let audio = JSON.parse(localStorage.getItem("audio"))
        document.querySelector("audio").currentTime = audio.audioTime      
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
    else {
        isMuted = false
        document.querySelector("audio").muted = false 
        document.querySelector(".img-audio").src = "../images/volume.png"
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
onLoad()
  
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

//click event when start button is pressed
document.querySelector("#btn-start").addEventListener("click", () => {
    window.location.replace("html/home.html")
    updateAudio()
})

//click event when rules button is pressed
document.querySelector("#btn-rules").addEventListener("click", () => {
    window.location.replace("html/rules.html")
    updateAudio()
})

//click event when load game button is pressed
document.querySelector("#btn-load").addEventListener("click", () => {
    window.location.replace("html/playGame.html?loadGame=1")
    updateAudio()
})
