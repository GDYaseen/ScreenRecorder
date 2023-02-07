const fs= require("fs");
const WebSocket = require('ws');
const { exit } = require('process');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
    console.log("###-Socket connected-###")
    ws.on('message', function incoming(data) {
        console.log("###--###")
        fs.appendFileSync("./data.webm", data,{encoding:"binary"})
        // console.log(data)
    });
    ws.on("close",()=>{
        if(fs.existsSync("data.webm")){
            fs.renameSync("data.webm", `${new Date().toISOString().replaceAll(":", "-").replace(".","-")}.webm`)
        }
    })
}); 

// const ffmpeg = require('fluent-ffmpeg');

// const command = ffmpeg()
//   .input('gdigrab')
//   .output('output.mp4')
//   .format('mp4')
//   .videoCodec('libx264')
//   .size('1920x1080')
//   .fps(30)
//   .run();

// // command.on('end', function() {
// //   console.log('Screen recording finished!');
// // });

// // command.on('error', function(err) {
// //   console.log('An error occurred: ' + err.message);
// // });

// setTimeout(() => {
//     command.kill();
//   }, 10000);