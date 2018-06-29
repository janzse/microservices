const cote = require('cote');

const led1Responder = new cote.Responder({
    name: 'led 1 responder',
    namespace: 'led1',
    respondsTo: ['led1-set']
});

const led1Publisher = new cote.Publisher({
    name: 'led 1 publisher',
    namespace: 'led1',
    broadcasts: ['led1-changed']
});

let led_status;
let val;

let lastState;
led1Responder.on('led1-set', (request) => {
    console.log("changed:",request.value);
    if(request.value !== lastState) {
        led1Publisher.publish('led1-changed', request.value);
        lastState = request.value;
    }

});

function publishLed1Status(status)
{
    //console.log("PUBLISH:", status);
    // dummy
    /*led_status = {
        description: 'Light status 1 changed',
        value: true,
        timestamp: new Date()
    };
    dummyVal = !dummyVal;*/
    //if (status !== undefined)
    //led1Publisher.publish('led1-changed', status);
}

//setInterval(publishLed1Status, 1000);
