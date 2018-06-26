var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
server.listen(4811);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});


io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });
});

/*
app.get('/', function (req, res) {
    res.sendFile('./index.js', {root: __dirname});
});

 // Make sure this returns the socketio

//app.set('socketIo', io);

//app.use('./', require('./routes'));

app.route('/test').get(function (req, res) {
    let socket = req.app.get('socketIo');
    socket.emit('hello', 'world');
    res.end();
});

io.sockets.on('connection', function(socket){
    socket.emit('test', 1);
});

module.exports = app;

console.log("HTTP-Server is running on", "http://localhost:4811");
*/