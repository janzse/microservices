const cote = require('cote');

const led1Responder = new cote.Responder({
    name: 'led 1 responder',
    namespace: 'sensor',
    respondsTo: ['led1-set']
});

const led1Publisher = new cote.Publisher({
    name: 'led 1 publisher',
    namespace: 'sensor',
    broadcasts: ['led1-set']
});

const bright2Subscriber = new cote.Subscriber({
    name: 'brightness 2 subscriber',
    namespace: 'sensor',
    subscribesTo: ['bright2']
})

let led_status;
let dummyVal = false;

led1Responder.on('led1-set', (request, callback) => {
    led_status = {
        description: 'Light status 1 changed',
        value: false,
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
                value: dummyVal,
                timestamp: new Date()
            };
    dummyVal = !dummyVal;
    led1Publisher.publish('led1-changed', led_status);
}

setInterval(publishLed1Status, 1000);
