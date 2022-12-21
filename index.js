const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server,{
    cors: {
        origin: "http://127.0.0.1:5500",
        methods: ["GET", "POST"]
      }
});

const users = {};

io.on('connection', (socket) => {
    socket.on('newUserAdd', (name) => {
        users[socket.id] = name;
        socket.broadcast.emit('userJoined', name);
    })

    socket.on('send', (message) => {
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]});
    })

    socket.on('disconnect', (message) => {
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });

})

server.listen(3000);



