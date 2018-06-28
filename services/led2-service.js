const cote = require('cote');

const led2Responder = new cote.Responder({
    name: 'led service 2',
    namespace: 'sensor',
    respondsTo: ['led2-set']
});

const led2Publisher = new cote.Publisher({
    name: 'led service 2',
    namespace: 'sensor',
    respondsTo: ['led2-set']
});

let led_status;

led2Responder.on('led2-set', (request, callback) => {
    if (request.value !== null) {
        led_status = {
            description: 'Light status 1 changed',
            value: request.value,
            timestamp: new Date()
        };
        callback(led_status);
    }
});

function updateLed2()
{
    led2Publisher.publish('led2-set', led_status);
}

setInterval(updateLed2, 1000);
