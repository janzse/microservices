const cote = require('cote');

const led1Responder = new cote.Responder({
    name: 'led 1 responder',
    namespace: 'led',
    respondsTo: ['led1']
});

const led1Publisher = new cote.Publisher({
    name: 'led 1 publisher',
    namespace: 'led',
    broadcasts: ['led1'],

});

const bright2Subscriber = new cote.Subscriber({
    name: 'brightness 2 subscriber',
    namespace: 'brightness',
    subscribesTo: ['bright2']
})

let led_status;

led1Responder.on('led1', (request, callback) => {
    led_status = {
        description: 'Light status changed',
        value: 255,
        timestamp: new Date()
    };
    callback(led_status);
});

let brightness;

setInterval(() => {
    bright2Subscriber.on('bright2', (request) => {
        if (request !== null)
            brightness = request;
    });
}, 1000);


function publishLed1Status()
{
    if (brightness !== null || brightness !== undefined)
        led1Publisher.publish('led1-changed', led_status);
}

setInterval(publishLed1Status, 1000);
