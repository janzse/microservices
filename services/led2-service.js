const cote = require('cote');

const led2Responder = new cote.Responder({
    name: 'led service 2',
    namespace: 'sensor',
    respondsTo: ['led2-set', 'led2']
});

const led2Publisher = new cote.Publisher({
    name: 'led service 2',
    namespace: 'sensor',
    broadcasts: ['led2-changed']
});

let led_status;

led2Responder.on('led2-set', (request) => {
    led_status = {
        description: 'Light status 2 changed',
        value: request.body.value,
        timestamp: new Date()
    };

});

led2Responder.on('led2', (request) => {
    console.log("set:",request.body);
    led_status = {
        description: 'Light status 2 changed',
        value: request.body.value,
        timestamp: new Date()
    };
    led2Publisher.publish('led2-changed', led_status);
});

function updateLed2()
{
    /*
    led_status = {
        description: 'Light status 1 changed',
        value: state,
        timestamp: new Date()
    };
    */
    if (led_status !== undefined)
        led2Publisher.publish('led2-changed', led_status);
}

//setInterval(updateLed2, 1000);
