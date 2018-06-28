const cote = require('cote');

const temp2Responder = new cote.Responder({
    name: 'temperature 2 responder',
    namespace: 'sensor',
    respondsTo: ['temp2-data']
});

const temp2Publisher = new cote.Publisher({
    name: 'temperature 2 publisher',
    namespace: 'sensor',
    respondsTo: ['temp2-data']
});

let temp_status;

temp2Responder.on('temp2-data', (request, callback) => {
    let temperature = Math.floor((Math.random() * 40) + Math.random() * 7);
    temp_status = {
        description: 'Temperature 1',
        value: temperature,
        timestamp: new Date()
    };
    callback(temp_status);
});

function publishTemperature2()
{
    temp2Publisher.publish('temp2-data', temp_status);
}

setInterval(publishTemperature2, 1000);
