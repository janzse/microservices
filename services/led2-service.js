const cote = require('cote');

const led2Responder = new cote.Responder({
    name: 'led 2 responder',
    namespace: 'led2',
    respondsTo: ['led2-set']
});

const led2Publisher = new cote.Publisher({
    name: 'led 2 publisher',
    namespace: 'led2',
    broadcasts: ['led2-changed']
});

let brightSubscriber = new cote.Subscriber({
    name: 'brightness subscriber',
    namespace: 'brightness',
    respondsTo: ['bright2']
});

let led_status;
/*
led2Responder.on('led2-set', (request) => {
    led_status = {
        description: 'Light status 2 changed',
        value: request.body.value,
        timestamp: new Date()
    };
});
*/
led2Responder.on('led2-set', (request) => {
    console.log("changed:",request.value);
    led2Publisher.publish('led2-changed', request.value);
});
let oldValue;
brightSubscriber.on('brightness-data', (brightness) => {
    if (brightness.value <= 210) {
        if (oldValue === undefined)
            oldValue = brightness.value; // first time check
        console.log(oldValue);
        if (oldValue !== brightness.value && !(oldValue < 210)) {
            led_status = {
                description: 'Light status 2 changed',
                value: true,
                timestamp: new Date()
            };
            led2Publisher.publish('led2-changed', led_status);
            oldValue = brightness.value;
        }
    }
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
    //if (led_status !== undefined)
        //led2Publisher.publish('led2-changed', led_status);
}

//setInterval(updateLed2, 1000);
