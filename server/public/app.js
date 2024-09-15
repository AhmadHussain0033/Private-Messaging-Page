document.addEventListener('DOMContentLoaded', () => {
    const socket = io();

    // Generate and display a random room ID
    const randomStringInput = document.getElementById('random-string');
    const roomID = generateRandomString(10);
    randomStringInput.value = roomID;

    // Copy room ID to clipboard
    document.getElementById('copy-btn').addEventListener('click', () => {
        randomStringInput.select();
        document.execCommand('copy');
        alert('Room ID copied to clipboard!');
    });

    // Create room button event
    document.getElementById('create-room-btn').addEventListener('click', () => {
        const nickname = document.getElementById('room-nickname').value.trim();
        if (!nickname) {
            alert('Please enter a nickname before creating a room.');
            return;
        }
        socket.emit('setNicknameAndJoinRoom', {
            nickname: nickname,
            roomId: randomStringInput.value
        });
        document.getElementById('chat-room-heading').innerText = `Room ID: ${randomStringInput.value}`;
        document.getElementById('chat-section').style.display = 'block';
    });

    // Join room button event
    document.getElementById('join-room-btn').addEventListener('click', () => {
        const joinRoomID = document.getElementById('join-room-id').value.trim();
        const nickname = document.getElementById('room-nickname').value.trim();
        if (!joinRoomID || !nickname) {
            alert('Please enter both a Room ID and nickname.');
            return;
        }
        socket.emit('setNicknameAndJoinRoom', {
            nickname: nickname,
            roomId: joinRoomID
        });
        document.getElementById('chat-room-heading').innerText = `Room ID: ${joinRoomID}`;
        document.getElementById('chat-section').style.display = 'block';
    });

    // Send message functionality
    document.getElementById('send-btn').addEventListener('click', () => {
        const message = document.getElementById('message-input').value.trim();
        if (message) {
            socket.emit('sendMessage', message);
            document.getElementById('message-input').value = ''; // Clear the input after sending
        }
    });

    // Receive message functionality
    const chatLog = document.getElementById('chat-log');
    socket.on('receiveMessage', (data) => {
        chatLog.value += `${data.nickname}: ${data.message}\n`;
        chatLog.scrollTop = chatLog.scrollHeight; // Auto-scroll to the bottom
    });

    // Utility function for generating random room ID
    function generateRandomString(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }
});
