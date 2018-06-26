const app = require('express')(),
    bodyParser = require('body-parser'),
    server = require('http').Server(app),
    io = require('socket.io')(server),
    cote = require('cote');

app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

let id = 0;

app.get('/humid1', function(req, res) {
    humid1Requester.send({type: 'humid1', id: id++}, function(humid) {
        res.send(JSON.stringify({humidity: humid}));
    });
});

app.get('/bright2', function(req, res) {
    bright2Requester.send({type: 'bright2', id: id++}, function(bright) {
        res.send(JSON.stringify({brightness: bright}));
    });
});

let humid1Requester = new cote.Requester({
    name: 'humidity 1 requester',
    namespace: 'humidity'
});

let bright2Requester = new cote.Requester({
    name: 'brightness 2 requester',
    namespace: 'brightness'
});

server.listen(4811);
io.on('connection', function(socket){
    console.log('a client connected');
    socket.on('disconnect', function(){
        console.log('client disconnected');
    });
});

new cote.Sockend(io, {
    name: 'client sockend server'
});

/*
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