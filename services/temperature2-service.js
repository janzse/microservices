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

let temp_status;
let temperature;

temp2Responder.on('temp2-data', (request) => {
    temperature = request;
    temp_status = {
        description: 'Temperature 2',
        value: temperature,
        timestamp: new Date()
    };
    temp2Publisher.publish('temp1-data', temp_status);
});

function publishTemperature2()
{
    if (temperature !== undefined) {
        console.log('publish: ', temp_status);
        temp2Publisher.publish('temp1-data', temp_status);
    }
}

//setInterval(publishTemperature2, 1000);
