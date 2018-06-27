const cote = require('cote');

const temp1Responder = new cote.Responder({
    name: 'Temperature Service 1',
    namespace: 'temperature',
    respondsTo: ['temp1']
});

const temp1Publisher = new cote.Publisher({
    name: 'Temperature Service 1',
    namespace: 'temperature',
    respondsTo: ['temp1']
});

let temperature;

temp1Responder.on('temp1', (request, callback) => {
    // temperatur abfragen
    temperature = Math.floor((Math.random() * 40) + Math.random() * 10);
    callback(temperature);
});

function updateTemperature1()
{
    temp1Publisher.publish('temp1', temperature);
}

setInterval(updateTemperature1, 1000);
