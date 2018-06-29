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

let lastState;
led1Responder.on('led1-set', (request) => {
    if(request.value !== lastState) {
        led1Publisher.publish('led1-changed', request.value);
        lastState = request.value;
    }

});
