const cote = require('cote');

const led2Responder = new cote.Responder({
    name: 'led service 2',
    namespace: 'led',
    respondsTo: ['led2']
});

const led2Publisher = new cote.Publisher({
    name: 'led service 2',
    namespace: 'led',
    respondsTo: ['led2']
});

led2Responder.on('led2', (request, callback) => {
    callback("on");
});

function updateLed2()
{
    led2Publisher.publish('led2', "on");
}

setInterval(updateLed2, 1000);
