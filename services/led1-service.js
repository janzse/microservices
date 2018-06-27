const cote = require('cote');

const led1Responder = new cote.Responder({
    name: 'LED service 1',
    respondsTo: ['led1']
});

const led1Publisher = new cote.Publisher({
    name: 'LED service 1',
    respondsTo: ['led1']
});

led1Responder.on('led 1', (request, callback) => {
    callback("on");
});

function updateLed1()
{
    led1Publisher.publish('led1', "on");
}

setInterval(updateLed1, 1000);
