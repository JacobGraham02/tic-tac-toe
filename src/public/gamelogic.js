const socket = new WebSocket('ws://localhost:3000'); // Replace with your server's URL

        const messageInput = document.getElementById('messageInput');
        const sendButton = document.getElementById('sendButton');
        const messagesDiv = document.getElementById('messages');

        socket.addEventListener('open', (event) => {
            console.log('WebSocket connection opened:', event);
        });

        socket.addEventListener('message', (event) => {
            console.log('Message received:', event.data);
            // Display the received message in the messagesDiv
            messagesDiv.innerHTML += `<p>${event.data}</p>`;
        });

        sendButton.addEventListener('click', () => {
            const message = messageInput.value;
            socket.send(message);
            messageInput.value = '';
        });