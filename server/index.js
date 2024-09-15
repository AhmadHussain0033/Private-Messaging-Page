const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Route for the homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Handle Socket.io connections
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Handle setting a nickname and joining a room
    socket.on('setNicknameAndJoinRoom', ({ nickname, roomId }) => {
        if (!nickname || !roomId) {
            console.error('Nickname or Room ID missing');
            return;
        }
        
        socket.nickname = nickname;
        socket.join(roomId);  // Join the specified room
        socket.roomId = roomId;
        console.log(`${nickname} joined room: ${roomId}`);

        // Notify users in the room
        io.to(roomId).emit('receiveMessage', {
            nickname: 'System',
            message: `${nickname} has joined the room`
        });
    });

    // Handle sending messages to the room
    socket.on('sendMessage', (message) => {
        if (socket.nickname && socket.roomId) {
            io.to(socket.roomId).emit('receiveMessage', {
                nickname: socket.nickname,
                message: message
            });
        } else {
            console.error('User is not in a room or does not have a nickname');
        }
    });

    // Handle user disconnect
    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
        if (socket.nickname && socket.roomId) {
            io.to(socket.roomId).emit('receiveMessage', {
                nickname: 'System',
                message: `${socket.nickname} has left the room`
            });
        }
    });
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});










