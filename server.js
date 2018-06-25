const app = require('express')();
const server = app.listen('4811');
const io = require('socket.io').listen(server);

/*
app.get('/', function (req, res) {
    res.sendFile('./index.js', {root: __dirname});
});
*/

app.use('./routes', require('./routes'));

io.sockets.on('connection', function(socket){
    socket.emit('test', 1);
})

module.exports = app;

console.log("HTTP-Server is running on", "http://localhost:4811");