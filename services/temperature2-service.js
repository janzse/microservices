const cote = require('cote');

const temp2Responder = new cote.Responder({
    name: 'Temperature Service 2',
    respondsTo: ['temp2']
});

const temp2Publisher = new cote.Publisher({
    name: 'Temperature Service 2',
    respondsTo: ['temp2']
});

let temperature;

temp2Responder.on('temp2', (request, callback) => {
    // temperatur abfragen
    temperature = Math.floor((Math.random() * 40) + (Math.random() * 7));
    callback(temperature);
});

function updateTEmperature2()
{
    temp2Publisher.publish('temp2', temperature);
}

setInterval(updateTEmperature2, 1000);
