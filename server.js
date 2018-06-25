const app = require('express')();
const server = app.listen('4811');
const io = require('socket.io').listen(server);

app.get('/', function (req, res) {
    res.sendFile('./index.html', {root: __dirname});
});

let routesApi = require('./index');
app.use('/api', routesApi);
module.exports = app;

io.sockets.on('connection', function(socket){
    socket.emit('test', 1);
})

console.log("HTTP-Server is running on", "http://localhost:4811");