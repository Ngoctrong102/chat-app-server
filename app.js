const express = require('express');
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');
const env = require('dotenv').config();
require('events').EventEmitter.defaultMaxListeners = 30;

const app = express();
const server = require('http').createServer(app);

const db = require('./src/config/database');
const parseUser = require('./src/middleware/parseUser');

global.__basedir = __dirname;

const io = require('socket.io')(server, {
    cors: {
        origin: process.env.ORIGIN,
        methods: ["GET", "POST"]
    }
});
io.use(function(socket, next) {
    if (socket.handshake.auth && socket.handshake.auth.token) {
        try {
            var user = jwt.decode(socket.handshake.auth.token, 'ahihi');
            socket.user = user;
            next();
        } catch (err) {
            return next(new Error('Authentication error'));

        }
    } else {
        next(new Error('Authentication error'));
    }
});

require('./src/socketio/listeners')(io);


const PORT = process.env.PORT;

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors({
    origin: process.env.ORIGIN,
    optionsSuccessStatus: 200
}));


// var peerServer = require('peer').ExpressPeerServer(server)
// peerServer.use(cors({
//     origin: process.env.ORIGIN,
//     optionsSuccessStatus: 200
// }));
// app.use('/peerServer', peerServer)
app.use('/getICEServer', require('./src/routes/ICEServer.router'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(parseUser);

app.use('/user', require('./src/routes/user.router'))
app.use('/conversation', require('./src/routes/conversation.router'))

server.listen(PORT, () => {
    console.log('Listening at port ' + PORT);
})