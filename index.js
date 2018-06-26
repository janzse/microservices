const app = require('express')(),
    bodyParser = require('body-parser'),
    server = require('http').Server(app),
    io = require('socket.io')(server),
    cote = require('cote');

app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/humid1', function(req, res) {
    humid1Requester.send({type: 'humid1', id: 1}, function(humid) {
        res.send(JSON.stringify({humidity: humid}));
    });
});

let humid1Requester = new cote.Requester({
    name: 'humidity 1 requester',
    namespace: 'humidity'
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