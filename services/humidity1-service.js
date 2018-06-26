const cote = require('cote');

let humid1Responder = new cote.Responder({
    name: 'humidity 1 responder',
    namespace: 'humidity',
    respondsTo: ['humid1']
});


let humid1Publisher = new cote.Publisher({
    name: 'humidity 1 publisher',
    namespace: 'humidity',
    broadcasts: ['humid1']
});

//humid1Responder.on('*', console.log);

let humidity;

humid1Responder.on('humid1', function (request, callback){
    humidity = Math.floor(Math.random() * (100 - 40) + (Math.random() * 50));
    callback(humidity);
});

function updateHumidity()
{
    humid1Publisher.publish('humid1', humidity);
}


setInterval(updateHumidity, 1000);
