const cote = require('cote');

const humid1Responder = new cote.Responder({
    name: 'humidity 1 responder',
    namespace: 'humidity',
    respondsTo: ['humidity-data']
});

const humid1Publisher = new cote.Publisher({
    name: 'humidity 1 publisher',
    namespace: 'humidity',
    broadcasts: ['humidity-data']
});

let humid_status;

humid1Responder.on('humidity-data', function (request){
    humid_status = {
        description: 'Humidity',
        value: request.value,
        timestamp: new Date()
    };
    humid1Publisher.publish('humidity-data', humid_status);
});