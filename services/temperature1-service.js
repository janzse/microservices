const cote = require('cote');

const temp1Responder = new cote.Responder({
    name: 'temperature 1 responder',
    namespace: 'temp1',
    respondsTo: ['temp1-data']
});

const temp1Publisher = new cote.Publisher({
    name: 'temperature 1 publisher',
    namespace: 'temp1',
    broadcasts: ['temp1-data']
});

temp1Responder.on('temp1-data', (request) => {
    let temp_status = {
        description: 'Temperature 1',
        value: request.value,
        timestamp: new Date()
    };
    temp1Publisher.publish('temp1-data', temp_status);
});