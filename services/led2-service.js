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

const humid1Subscriber = new cote.Subscriber({
    name: 'humidity 1 subscriber',
    namespace: 'sensor',
    subscribesTo: ['bright2']
})

let led_status;

led2Responder.on('led2', (request, callback) => {
    if (brightness !== null)
    {
        led_status = {
            description: 'Light status changed',
            value: true,
            timestamp: new Date()
        };
        callback(led_status);
    }
    else
        callback("No brightness value");
});

let humidity;

humid1Subscriber.on('bright2', (request) => {
    if (request !== null && request !== humidity)
        humidity = request;
});


function updateLed2()
{
    led2Publisher.publish('led2', led_status);
}

setInterval(updateLed2, 1000);
