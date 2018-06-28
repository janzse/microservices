const cote = require('cote');

const temp1Responder = new cote.Responder({
    name: 'temperature 1 responder',
    namespace: 'temperature1',
    respondsTo: ['temp1']
});

const temp1Publisher = new cote.Publisher({
    name: 'temperature 1 publisher',
    namespace: 'temperature1',
    respondsTo: ['temp1']
});

let temperature;

temp1Responder.on('temp1', (request, callback) => {
    // temperatur abfragen
    temperature = Math.floor((Math.random() * 40) + Math.random() * 10);
    callback(temperature);
});

function publishTemperature1()
{
    temp1Publisher.publish('temp1', temperature);
}

setInterval(publishTemperature1, 1000);
