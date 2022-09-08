const express = require('express');
const fs = require('fs');                                                       
const app = express();
const http = require("http");
const server = http.createServer(app);
const port  = 3000;

const { MongoClient } = require("mongodb");
const rawdata = fs.readFileSync('config.json');                                 
const config = JSON.parse(rawdata);                                             
                                                                                
const uri =                                                                     
  `mongodb+srv://${config.MONGO_USER}:${config.MONGO_PASS}@${config.MONGO_URL}/?retryWrites=true&w=majority`;
                                                                                
const client = new MongoClient(uri);                                            
                                                                                

app.use("", express.static(__dirname));
app.use(express.json());
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/api/v1/users', async (req, res) => {
    console.log(req.body);
    try {
        const database = client.db('slack-clone');                             
        const users_collection = database.collection('users');                           

        users_collection.find({ username: req.body.username }).toArray(async function(err, result) {
            if (err) throw err;
            if (result.length == 0) {
                const user = await users_collection.insertOne({ 'username': req.body.username });
                res.send(user);
            }
        });
    } finally {
        console.log("End");
    }
});

app.get('/api/v1/channels', async (req, res) => {
    try {
        const database = client.db('slack-clone');                             
        const channels = database.collection('channels');                           
        console.log(channels);

        await channels.find({}).toArray(function(err, result) {
            if (err) throw err;
            res.send(result);
        });
    } finally {
        console.log("End");
    }
});

io.on('connection', (socket) => {
    console.log('a user connected');

	socket.on('chat message', (msg) => {
        let time = new Date();
        if (msg.username)
            io.emit('chat message', {username: msg.username, message: msg.message, time: time});
	});

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

});

server.listen(port, () => {
    console.log(`listening in ${port}`);
});

