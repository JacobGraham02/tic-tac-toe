const WebSocket = require('ws');
const express = require('express');
const http = require('http');
const path = require('path');

const app = express();
const server = http.createServer(app);
app.use(express.static(path.join(__dirname, '../public')));
app.get('/', (req, res) => {
   res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const web_socket_server = new WebSocket.Server({ server});

web_socket_server.on('connection', (web_socket) => {
    console.log('Client connected');

    web_socket.on('message', (message) => {
        console.log(`Received: ${message}`);
        // Send the received message back to the client
        web_socket.send(`Server received: ${message}`);
    });

    web_socket.on('close', () => {
        console.log('Client disconnected');
    });
//    console.log('Connected');
//    web_socket.on('message', (message) => {
//    console.log(`Received message => ${message}`);
//
//    web_socket_server.clients.forEach((client) => {
//      if (client.readyState === WebSocket.OPEN) {
//        client.send(message);
//      }
//    });
//  });
});

module.exports = {server};
/**
 * <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>WebSocket Chat</title>
</head>
<body>
    <input type="text" id="roomInput" placeholder="Enter room name" />
    <button onclick="joinRoom()">Join Room</button>
    <div id="rooms"></div>

    <script>
        const ws = new WebSocket('ws://localhost:3001');
        const rooms = {};

        ws.addEventListener('message', (event) => {
            const messageObj = JSON.parse(event.data);
            const { type, room, content } = messageObj;
            if (type === 'message') {
                const roomDiv = rooms[room];
                const messageDiv = document.createElement('div');
                messageDiv.textContent = content;
                roomDiv.appendChild(messageDiv);
            }
        });

        function joinRoom() {
            const roomName = document.getElementById('roomInput').value;
            if (roomName) {
                ws.send(JSON.stringify({ type: 'join', room: roomName }));
                
                const roomDiv = document.createElement('div');
                roomDiv.id = roomName;
                
                const roomTitle = document.createElement('h2');
                roomTitle.textContent = `Room: ${roomName}`;
                roomDiv.appendChild(roomTitle);
                
                const input = document.createElement('input');
                input.type = 'text';
                roomDiv.appendChild(input);
                
                const button = document.createElement('button');
                button.textContent = 'Send';
                button.onclick = () => {
                    ws.send(JSON.stringify({ type: 'message', room: roomName, content: input.value }));
                    input.value = '';
                };
                roomDiv.appendChild(button);
                
                document.getElementById('rooms').appendChild(roomDiv);
                rooms[roomName] = roomDiv;
            }
        }
    </script>
</body>
</html>

 */