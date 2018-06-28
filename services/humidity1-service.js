const cote = require('cote');

const humid1Responder = new cote.Responder({
    name: 'humidity 1 responder',
    namespace: 'sensor',
    respondsTo: ['humid1']
});


const humid1Publisher = new cote.Publisher({
    name: 'humidity 1 publisher',
    namespace: 'sensor',
    broadcasts: ['humid1']
});

let humidity;

humid1Responder.on('humid1', function (request, callback){
    // Luftfeuchtigkeit abfragen
    humidity = Math.floor(Math.random() * (100 - 40) + (Math.random() * 50));
    callback(humidity);
});

function publishHumidity1()
{
    humid1Publisher.publish('humid1', humidity);
}

setInterval(publishHumidity1, 1000);
