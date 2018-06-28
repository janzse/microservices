const cote = require('cote');

const humid1Responder = new cote.Responder({
    name: 'humidity 1 responder',
    namespace: 'sensor',
    respondsTo: ['humidity-data']
});

const humid1Publisher = new cote.Publisher({
    name: 'humidity 1 publisher',
    namespace: 'sensor',
    broadcasts: ['humidity-data']
});

let humid_status;

humid1Responder.on('humidity-data', function (request, callback){
    // Luftfeuchtigkeit abfragen
    let humidity = Math.floor(Math.random() * (100 - 40) + (Math.random() * 50));
    humid_status = {
        description: 'Humidity',
        value: humidity,
        timestamp: new Date()
    };
    callback(humidity);
});

function publishHumidity1()
{
    let humidity = Math.floor(Math.random() * (100 - 40) + (Math.random() * 50));
    humid_status = {
        description: 'Humidity',
        value: humidity,
        timestamp: new Date()
    };
    humid1Publisher.publish('humidity-data', humid_status);
}

setInterval(publishHumidity1, 1000);
