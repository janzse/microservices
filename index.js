const cors = require('cors');

const app = require('express')(),
    bodyParser = require('body-parser'),
    server = require('http').Server(app),
    io = require('socket.io')(server),
    cote = require('cote');

app.use(bodyParser.json());
app.use(cors());

/*
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});
*/

let id = 0;

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
    namespace: 'humidity'
});

let bright2Requester = new cote.Requester({
    name: 'brightness 2 requester',
    namespace: 'brightness'
});

let temp1Requester = new cote.Requester({
    name: 'temperature 1 requester',
    namespace: 'temp1'
});

let temp2Requester = new cote.Requester({
    name: 'temperature 2 requester',
    namespace: 'temp2'
});

let led1Requester = new cote.Requester({
    name: 'led 1 requester',
    namespace: 'led1'
});

let led2Requester = new cote.Requester({
    name: 'led 2 requester',
    namespace: 'led2'
});

function startTimer()
{
    if (!timerRunning)
    {
        timerRunning = true;
        intervalEvent = setInterval(() => requestData(), 3000);
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
let dataPi1;
let dataPi2;
server.listen(4811);

function requestData() {

    if (dataPi1 && pi1Socket) {
        dataPi1.methods.forEach((element) => {
            pi1Socket.emit('request', {method: element});
        });
    }

    if(dataPi2 && pi2Socket) {
        dataPi2.methods.forEach((element) => {
            pi2Socket.emit('request', {method: element});
        })
    }
}


io.on('connection', function(socket){
    console.log('a client connected');
    console.log("clients connected:", Object.keys(io.sockets.connected).length);

    // Verbindungen zu Raspberry Pi
    socket.on('register', (data) => {
        if(data.deviceID === 1) {
            pi1Socket = socket;
            dataPi1 = data;
            pi1Socket.on('responseSLED', function(data){
                const led_status = {
                    description: `Light status 1 changed`,
                    value: data.value,
                    timestamp: new Date()
                };
                led1Requester.send({type: 'led1-set', id: id++, value: led_status});
            });

        } else if(data.deviceID === 2) {
            pi2Socket = socket;
            dataPi2 = data;
            pi2Socket.on('responseSLED', function(data){
                const led_status = {
                    description: `Light status 2 changed`,
                    value: data.value,
                    timestamp: new Date()
                };
                led2Requester.send({type: 'led2-set', id: id++, value: led_status});
            });
        }
        startTimer();
    });

    socket.on('responseLED', function(data){
        if(data.deviceID === 1) {
            led1Requester.send({type: 'led1-changed', id: id++, value: data.response});
        }
        else {
            led2Requester.send({type: 'led2-changed', id: id++, value: data.response});
        }
    });
    socket.on('responseDTemp', function(data) {
        temp2Requester.send({type: 'temp2-data', id: id++, value: data.response});
    });
    socket.on('responseDHum', function(data) {
        humid1Requester.send({type: 'humidity-data', id: id++, value: data.response});
    });
    socket.on('responseCLux', function(data) {
        bright2Requester.send({type: 'brightness-data', id: id++, value: data.response});
    });
    socket.on('responseCTemp', function(data) {
        temp1Requester.send({type: 'temp1-data', id: id++, value: data.response});
    });

    socket.on('error', function(err) {
        console.log(err);
    });

    socket.on('disconnect', function(){
        console.log('client disconnected');
        if (Object.keys(io.sockets.connected).length <= 0 )
            stopTimer();
    });
});

new cote.Sockend(io, {
    name: 'client sockend server'
});