const cote = require('cote');

const led2Responder = new cote.Responder({
    name: 'led service 2',
    namespace: 'sensor',
    respondsTo: ['led2-set']
});

const led2Publisher = new cote.Publisher({
    name: 'led service 2',
    namespace: 'sensor',
    broadcasts: ['led2-changed']
});

let led_status;
let state;

led2Responder.on('led2-set', (request, callback) => {
    state = request.body.value;
    led_status = {
        description: 'Light status 1 changed',
        value: request.body.value,
        timestamp: new Date()
    };
    callback(led_status);
});

function updateLed2()
{
    led_status = {
        description: 'Light status 1 changed',
        value: state,
        timestamp: new Date()
    };
    led2Publisher.publish('led2-changed', led_status);
}

setInterval(updateLed2, 1000);
