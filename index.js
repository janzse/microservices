const cors = require('cors');

const app = require('express')(),
    bodyParser = require('body-parser'),
    server = require('http').Server(app),
    io = require('socket.io')(server),
    cote = require('cote');

app.use(bodyParser.json());
app.use(cors());

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

let id = 0;

app.get('/home', function(req, res) {
    let data = [];

    let req_led1 = {type: 'led1-set', id: id++};
    led1Requester.send(req_led1, (led) => {
        data.push({led1: led});
    });

    let req_led2 = {type: 'led2-set', id: id++};
    led2Requester.send(req_led2, (led) => {
        data.push({led2: led});
    });

    let req_temp1 = {type: 'temp1-data', id: id++};
    temp1Requester.send(req_temp1, (temp) => {
        data.push({temp1: {value: temp}});
    });

    let req_temp2 = {type: 'temp2-data', id: id++};
    temp2Requester.send(req_temp2, (temp) => {
        data.push({temp2: {value: temp}});
    });

    let req_humid1 = {type: 'humidity-data', id: id++};
    humid1Requester.send(req_humid1, (humid) => {
        data.push({humid1: {value: humid}});
    });

    let req_bright2 = {type: 'brightness-data', id: id++};
    bright2Requester.send(req_bright2, (bright) => {
        data.push({bright2: {value: bright}});
        res.send(JSON.stringify({data: data}));
    });
});

app.get('/humid1', function(req, res) {
    humid1Requester.send({type: 'humidity-data', id: id++}, function(humid) {
        res.send(JSON.stringify({humidity: humid}));
    });
});

app.get('/bright2', function(req, res) {
    bright2Requester.send({type: 'brightness-data', id: id++}, function(bright) {
        res.send(JSON.stringify({brightness: bright}));
    });
});

app.get('/temp1', function(req, res) {
    temp1Requester.send({type: 'temp1-data', id: id++}, function(temp) {
        res.send(JSON.stringify({temperature1: temp}));
    });
});

app.get('/temp2', function(req, res) {
    temp2Requester.send({type: 'temp2-data', id: id++}, function(temp) {
        res.send(JSON.stringify({temperature2: temp}));
    });
});

app.post('/led1', function(req, res) {
    //led1Requester.send({type: 'led1-set', id: id++, body: req.body, socket: pi1Socket});
    console.log(req.body);
    pi1Socket.emit('request', { method: "setLED", data: req.body.value});
    res.send(JSON.stringify({status: "success"}));
});

app.post('/led2', function(req, res) {
    pi2Socket.emit('request', { method: "setLED", data: req.body.value});
    res.send(JSON.stringify({status: "success"}));
});

let humid1Requester = new cote.Requester({
    name: 'humidity 1 requester',
    namespace: 'sensor'
});

let bright2Requester = new cote.Requester({
    name: 'brightness 2 requester',
    namespace: 'sensor'
});

let temp1Requester = new cote.Requester({
    name: 'temperature 1 requester',
    namespace: 'sensor'
});

let temp2Requester = new cote.Requester({
    name: 'temperature 2 requester',
    namespace: 'sensor'
});

let led1Requester = new cote.Requester({
    name: 'led1 1 requester',
    namespace: 'sensor'
});

let led2Requester = new cote.Requester({
    name: 'led1 2 requester',
    namespace: 'sensor'
});

let nodeTempRequester = new cote.Requester({
    name: 'node 1 temp requester',
    namespace: 'sensor'
});

function startTimer(socket, data)
{
    if (!timerRunning)
    {
        timerRunning = true;
        intervalEvent = setInterval(() => requestData(socket, data), 3000);
    }
}
function stopTimer()
{
    if (timerRunning)
    {
        clearInterval(intervalEvent);
        timerRunning = false;
    }
}
let timerRunning;
let intervalEvent;
let pi1Socket;
let pi2Socket;

server.listen(4811);

function requestData(socket, data) {
    //console.log(data);
    data.methods.forEach((element) => {
        socket.emit('request', {method: element});
    });
}

io.on('connection', function(socket){
    console.log('a client connected');
    console.log("clients connected:", Object.keys(io.sockets.connected).length);
    // Verbindungen zu Raspberry Pi
    socket.on('register', (data) => {
        //====================
        // TODO
        console.log("deviceID:", data.deviceID);
        if(data.deviceID === 1) {
            pi1Socket = socket;
            pi1Socket.on('responseSLED', function(data){
                console.log("responseSLED");
                console.log(data);
                const deviceID = data.deviceID;
                const led_status = {
                    description: `Light status ${deviceID} changed`,
                    value: data.response,
                    timestamp: new Date()
                };
                socket.broadcast.emit(`led1-changed`, led_status);
                console.log("ID:",deviceID);
                console.log("led_status:",led_status);

            });

        } else if(data.deviceID === 2) {
            pi2Socket = socket;
        }
        //====================
        startTimer(socket, data);

    });

    socket.on('responseLED', function(data){
        console.log("responseLED");
        console.log(data);

    });
    socket.on('responseDTemp', function(data){
        console.log("responseTemp");
        console.log(data);
        nodeTempRequester.send({type: 'temp2-data', id: id++, value: data});
    });
    socket.on('responseDHum', function(data){
        console.log("responseDHum");
        console.log(data);
    });
    socket.on('responseCLux', function(data){
        console.log("responseCLux");
        console.log(data);
    });
    socket.on('responseCTemp', function(data){
        console.log("responseCTemp");
        console.log(data);
        nodeTempRequester.send({type: 'temp1-data', id: id++, value: data});
    });

    socket.on('error', function(err){
        console.log(err);
    });

    socket.on('disconnect', function(){
        console.log('client disconnected');
        if (Object.keys(io.sockets.connected).length <= 0 )
            stopTimer();
    });
});
/*
{ methods:
   [ 'setLED',
     'getLED',
     'readDHT22Temperature',
     'readDHT22Humidity' ] }

*/


/*
io.on('register', function(data){
    console.log(data);
});
*/

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