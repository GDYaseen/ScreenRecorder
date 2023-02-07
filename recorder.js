// document.addEventListener("keydown", function (e) {
//     if ((e.ctrlKey && e.shiftKey && e.code === "KeyI") || (e.ctrlKey && e.code === "KeyR") || e.keyCode === 116 || e.keyCode === 123 || e.keyCode === 122) {
//            e.preventDefault();
//      }
// });



let mediaRecorder;
let chunks;
let ws

let vid = document.querySelector("video")
   
let str
function startRecording(){
    ws =new WebSocket('ws://localhost:8080');
    navigator.mediaDevices.getDisplayMedia(constraints).then(stream => {
        // alert(showPreview)
        if(showPreview){
            console.log("showPreview")
            vid.srcObject=stream
            vid.play()
        }

        mediaRecorder = new MediaRecorder(stream,{
            mimeType: 'video/webm;codecs=vp9'
          });
        chunks = [];

        let chunkInterval;
        let chunkSize = 1000
        
        mediaRecorder.ondataavailable = e => {
            // console.log("data available")
                sendToServer(e.data);
        };
        mediaRecorder.start()

        chunkInterval = setInterval(() => {
            if("recording"==(mediaRecorder.state)){
                mediaRecorder.requestData();
            }
          }, chunkSize);

          str=stream
        //   console.log(stream.getVideoTracks())
        stream.getVideoTracks()[0].addEventListener("ended", ()=>{
            console.log("pressed stop sharing")
            StopButton.style.display="none"
            StartButton.style.display="block"
            stopRecording()
        })
        console.log("recording started maybe")
        });
    }

function stopRecording() {
    mediaRecorder.requestData();
    mediaRecorder.stop();
    ws.close()
    str.getVideoTracks()[0].stop()
}
// let text = ""
function sendToServer(chunks) {
    console.log("sendtoserver")
    console.log(chunks)
    // chunks.forEach(chunk => {
    ws.send(chunks);
    // });

}

window.addEventListener("onbeforeunload", ()=>{
})
   // ws.onopen = function (event) {
   //         // text+=Math.floor(Math.random()*10)+""
   //         while(ws.OPEN){

   //             text+="sorhdituftsorhdituftsorhdituftsorhdituftsorhdituftsorhdituftsorhdituftsorhdituftsorhdituftsorhdituftsorhdituftsorhdituftsorhdituftsorhdituftsorhdituftsorhdituftsorhdituftsorhdituftsorhdituftsorhdituftsorhdituftsorhdituftsorhdituftsorhdituftsorhdituftsorhdituftsorhdituftsorhdituftsorhdituftsorhdituftsorhdituftsorhdituftsorhdituftsorhdituftsorhdituftsorhdituftsorhdituftsorhdituftsorhdituftsorhdituft"
   //             if(text.length>=800){
   //                 // ws.send(Date.now());
   //                 ws.send(text+"\n");
   //                 text = ""
   //             }
   //         }
   // }