const cote = require('cote');

const temp2Responder = new cote.Responder({
    name: 'temperature 2 responder',
    namespace: 'temp2',
    respondsTo: ['temp2-data']
});

const temp2Publisher = new cote.Publisher({
    name: 'temperature 2 publisher',
    namespace: 'temp2',
    broadcasts: ['temp2-data']
});

temp2Responder.on('temp2-data', (request) => {
    let temp_status = {
        description: 'Temperature 2',
        value: request.value,
        timestamp: new Date()
    };
    temp2Publisher.publish('temp2-data', temp_status);
});