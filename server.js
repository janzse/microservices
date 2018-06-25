const app = require('express')();
const server = app.listen('4811');
const io = require('socket.io').listen(server);

app.get('/', function (req, res) {
    res.sendfile('./index.html' );
});