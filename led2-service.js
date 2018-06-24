const cote = require('cote');
const getLed2 = new cote.Responder({name: 'LED service 2'});

getLed1.on('led 2', (request, callback) => {
    callback("on");
});