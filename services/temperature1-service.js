const cote = require('cote');

const temp1Responder = new cote.Responder({
    name: 'temperature 1 responder',
    namespace: 'sensor',
    respondsTo: ['temp1-data']
});

const temp1Publisher = new cote.Publisher({
    name: 'temperature 1 publisher',
    namespace: 'sensor',
    broadcasts: ['temp1-data']
});

let temp_status;
let temperature;

temp1Responder.on('temp1-data', (request) => {
    //let temperature = Math.floor((Math.random() * 40) + Math.random() * 7);
    temperature = request.value.response;
    temp_status = {
        description: 'Temperature 1',
        value: temperature,
        timestamp: new Date()
    };
    //console.log(request);
    //temp1Publisher.publish('temp1-data', temp_status);
});

function publishTemperature1()
{
    /*
    let temperature = Math.floor((Math.random() * 40) + Math.random() * 7);
    temp_status = {
        description: 'Temperature 1',
        value: temperature,
        timestamp: new Date()
    };
    */
    //console.log(temp_status);
    if (temperature !== undefined) {
        console.log('publish: ', temp_status);
        temp1Publisher.publish('temp1-data', temp_status);
    }

}

setInterval(publishTemperature1, 3000);