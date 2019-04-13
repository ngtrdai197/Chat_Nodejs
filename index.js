const app = require('express')();
const express = require('express');
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'))

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

let list_user = [];

io.on('connection', (socket) => {
    socket.on('signin-username', (username) => {
        if (list_user.indexOf(username) > -1) {
            socket.emit('exists_username', `${username} đã tồn tại. Kiểm tra lại !!!`);
        } else {
            socket.userName = username;
            list_user.push(username);
            socket.emit('yourself-signin', list_user);
            socket.broadcast.emit('new-user-signin', `${username} mới tham gia vào cuộc trò chuyện`);
            io.emit('new-user', list_user);
        }

    })
    socket.on('send-message', content_message => {
        console.log(content_message);
        const message = {
            username: socket.userName,
            message: content_message
        }
        io.emit('server-send-message',  message);
    })

    socket.on('disconnect', () => {
        console.log('User disconnected ...');
    })
});



http.listen(3000, () => {
    console.log('Server starting at port: ' + 3000);
})