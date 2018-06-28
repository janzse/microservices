const cote = require('cote');

const led1Responder = new cote.Responder({
    name: 'led 1 responder',
    namespace: 'sensor',
    respondsTo: ['led1-set']
});

const led1Publisher = new cote.Publisher({
    name: 'led 1 publisher',
    namespace: 'sensor',
    broadcasts: ['led1-changed']
});

const bright2Subscriber = new cote.Subscriber({
    name: 'brightness 2 subscriber',
    namespace: 'sensor',
    subscribesTo: ['bright2']
})

let led_status;
let dummyVal = false;
let state;

led1Responder.on('led1-set', (request, callback) => {
    state = request.body.value;
    led_status = {
        description: 'Light status 1 changed',
        value: request.body.value,
        timestamp: new Date()
    };
    callback(led_status);
});

let brightness;

bright2Subscriber.on('bright2', (request) => {
    brightness = request;
});

function publishLed1Status()
{
    // dummy
    led_status = {
        description: 'Light status 1 changed',
        value: state,
        timestamp: new Date()
    };
    dummyVal = !dummyVal;
    led1Publisher.publish('led1-changed', dummyVal);
}

setInterval(publishLed1Status, 1000);
