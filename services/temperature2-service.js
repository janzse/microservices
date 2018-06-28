const cote = require('cote');

const temp2Responder = new cote.Responder({
    name: 'temperature 2 responder',
    namespace: 'temperature2',
    respondsTo: ['temp2']
});

const temp2Publisher = new cote.Publisher({
    name: 'temperature 2 publisher',
    namespace: 'temperature2',
    respondsTo: ['temp2']
});

let temperature;

temp2Responder.on('temp2', (request, callback) => {
    // Temperatur abfragen
    temperature = Math.floor((Math.random() * 40) + Math.random() * 7);
    callback(temperature);
});

function publishTemperature2()
{
    temp2Publisher.publish('temp2', temperature);
}

setInterval(publishTemperature2, 1000);
