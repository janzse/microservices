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

app.get('/home', function(req, res) {
    /*dataRequester.send({type: 'home', id: id++}, function(data) {
        res.send(JSON.stringify({data: data}));
    });*/
    let data = [];

    let req_led1 = {type: 'led1', id: id++};
    led1Requester.send(req_led1, (led) => {
        data.push({led1: led});
        res.send(JSON.stringify({data: data}));
    });

    let req_led2 = {type: 'led2', id: id++};
    led2Requester.send(req_led2, (led) => {
        data.push({led2: led});
    });
/*
    let req_temp1 = {type: 'temp1', id: id++};
    temp1Requester.send(req_temp1, (temp) => {
        data.push({temp1: temp});
    });

    let req_temp2 = {type: 'temp2', id: id++};
    temp2Requester.send(req_temp2, (temp) => {
        data.push({temp2: temp});
    });

    let req_humid1 = {type: 'humid1', id: id++};
    humid1Requester.send(req_humid1, (humid) => {
        data.push({humid1: humid});
    });

    let req_bright2 = {type: 'bright2', id: id++};
    bright2Requester.send(req_bright2, (bright) => {
        data.push({bright2: {value: bright}});
        //res.send(JSON.stringify({data: data}));
    });
*/
});

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

app.get('/temp1', function(req, res) {
    temp1Requester.send({type: 'temp1', id: id++}, function(temp) {
        res.send(JSON.stringify({temperature1: temp}));
    });
});

app.get('/temp2', function(req, res) {
    temp2Requester.send({type: 'temp2', id: id++}, function(temp) {
        res.send(JSON.stringify({temperature2: temp}));
    });
});

app.get('/led1', function(req, res) {
    led1Requester.send({type: 'led1', id: id++}, function(led) {
        res.send(JSON.stringify({led: led}));
    });
});

app.get('/led2', function(req, res) {
    led2Requester.send({type: 'led2', id: id++}, function(led) {
        res.send(JSON.stringify({led: led}));
    });
});

let dataRequester = new cote.Requester({
    name: 'data requester',
    namespace: 'all'
});

let humid1Requester = new cote.Requester({
    name: 'humidity 1 requester',
    namespace: 'humidity'
});

let bright2Requester = new cote.Requester({
    name: 'brightness 2 requester',
    namespace: 'brightness'
});

let temp1Requester = new cote.Requester({
    name: 'temperature 1 requester',
    namespace: 'temperature'
});

let temp2Requester = new cote.Requester({
    name: 'temperature 2 requester',
    namespace: 'temperature'
});

let led1Requester = new cote.Requester({
    name: 'led1 1 requester',
    namespace: 'led'
});

let led2Requester = new cote.Requester({
    name: 'led1 2 requester',
    namespace: 'led'
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