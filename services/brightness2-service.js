const cote = require('cote');

const bright2Responder = new cote.Responder({
    name: 'brightness 2 responder',
    namespace: 'brightness',
    respondsTo: ['brightness-data']
});

let bright2Publisher = new cote.Publisher({
    name: 'brightness 2 publisher',
    namespace: 'brightness',
    broadcasts: ['brightness-data']
});

let bright_status;

bright2Responder.on('brightness-data', (request) => {
    bright_status = {
        description: 'Brightness',
        value: request.value,
        timestamp: new Date()
    };
    bright2Publisher.publish('brightness-data', bright_status);
});