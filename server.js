const WebSocketServer = require('ws').Server;
const express = require('express')

const wss = new WebSocketServer({port: 8080});
let CLIENTS=[];

wss.on('connection', function(ws) {
    // CLIENTS.push(ws);
    ws.on('message', function(message) {
        message = JSON.parse(message);

        if (message.action === 'INIT') {
            CLIENTS[message.id] = ws;
            listenAll();
        }

        if (message.action === 'SHOW') {
            CLIENTS.forEach( function(socket,i){
                //socket.on('close', console.log("Connection closed"+i));
                console.log(socket);
                console.log(i);
            });
        }
        // sendAll(message);
    });
    ws.send("NEW USER JOINED");
});


function listenAll(){
    CLIENTS.forEach( function(socket,i){
        socket.on('close', function(){
            console.log("Connection closed"+i)
        });
    });
}

function sendAll (message) {
    for (var i=0; i<CLIENTS.length; i++) {
        CLIENTS[i].send("Message: " + message);
    }
}


const app = express();

app.listen(3000)