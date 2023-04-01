const express = require('express');
const app = express();
const http = require("http");
const server = http.createServer(app);

const options = { /* */ };
const port  = 3000;

app.use("", express.static(__dirname));
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', {username: msg.username, message: msg.message});
  });
});

server.listen(port, () => {
    console.log(`listening in localhost:${port}`);
});
