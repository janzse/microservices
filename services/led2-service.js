const cote = require('cote');

const led2Responder = new cote.Responder({
    name: 'led service 2',
    namespace: 'sensor',
    respondsTo: ['led2']
});

const led2Publisher = new cote.Publisher({
    name: 'led service 2',
    namespace: 'sensor',
    respondsTo: ['led2']
});

let led_status;

led2Responder.on('led2', (request, callback) => {
    led_status = {
        description: 'Light status 2 changed',
        value: true,
        timestamp: new Date()
    };
    callback(led_status);
});

function updateLed2()
{
    led2Publisher.publish('led2', led_status);
}

setInterval(updateLed2, 1000);
