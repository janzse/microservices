const cote = require('cote');
const getLed1 = new cote.Responder({
    name: 'LED service 1',
    respondsTo: ['led1']
});

getLed1.on('led 1', (request, callback) => {
    callback("on");
});