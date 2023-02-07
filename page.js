let recordInput = document.querySelector("#recordAside")
let settingsInput = document.querySelector("#settingsAside")
let recordSection = document.getElementById("recordSection")
let settingsSection = document.getElementById("settingsSection")
let header = document.querySelector("section>h1")
recordInput.addEventListener("change", ()=>{
    if(recordAside.checked){
        recordSection.style.display="grid"
        settingsSection.style.display="none"
        header.innerHTML="Recording"
    }
})
settingsInput.addEventListener("change", ()=>{
    if(settingsAside.checked){
        settingsSection.style.display="grid"
        recordSection.style.display="none"
        header.innerHTML="Settings"
    }
})

let resolutionInputX = document.getElementById("resX")
resolutionInputX.value = screen.width;
let resolutionInputY = document.getElementById("resY")
resolutionInputY.value = screen.height;
resolutionInputX.addEventListener("input", ()=>{
    resolutionInputY.value=Math.ceil((screen.height/screen.width)*resolutionInputX.value)
})
resolutionInputY.addEventListener("input", ()=>{
    resolutionInputX.value=Math.floor((screen.width/screen.height)*resolutionInputY.value)
})

let fps = document.getElementById("fps")
fps.value=30


let StartButton = document.getElementById("StartButton")
let StopButton = document.getElementById("StopButton")
StartButton.addEventListener("click", ()=>{
    StartButton.style.display="none"
    StopButton.style.display="block"
})
StopButton.addEventListener("click", ()=>{
    StopButton.style.display="none"
    StartButton.style.display="block"
})

let preview = document.getElementById("preview")
let showPreview = preview.checked
let video = document.querySelector("video")
let echo = document.getElementById("echo")
let sRate = document.getElementById("sampleRate")


let constraints={
    video: {
        width:resolutionInputX.value,
        height:resolutionInputY.value,
        frameRate:30,
        displaySurface:"monitor"
    },
    audio: {
        echoCancellation:false,
        sampleRate: 44100}
}

saveConstraints = ()=>{
    switch(preview.checked){
        case true:
                showPreview = true
                video.removeAttribute("hidden")
            break;
        case false:
                showPreview = false
                video.setAttribute("hidden", true)
            break;
    }
    constraints = {
        video: {
            width:resolutionInputX.value,
            height:resolutionInputY.value,
            frameRate:fps.value,
            displaySurface:"monitor"
        },
        audio: {
            echoCancellation:echo.checked,
            sampleRate: sRate.value}
    }
}