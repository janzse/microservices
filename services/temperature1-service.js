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

let temp_status;
let temperature;

temp1Responder.on('temp1-data', (request) => {
    //let temperature = Math.floor((Math.random() * 40) + Math.random() * 7);
    console.log(request);
    temperature = request;
    temp_status = {
        description: 'Temperature 1',
        value: temperature,
        timestamp: new Date()
    };
    temp1Publisher.publish('temp1-data', temp_status);
});

function publishTemperature1()
{
    if (temperature !== undefined) {
        console.log('publish: ', temp_status);
        temp1Publisher.publish('temp1-data', temp_status);
    }
}

//setInterval(publishTemperature1, 3000);