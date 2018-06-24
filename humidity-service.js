const cote = require('cote');
const getHumid1 = new cote.Responder({name: 'Humidity Service 1'});

getHumid1.on('humidity 1', (request, callback) => {
    let humidity = Math.floor(Math.random() * (100 - 40)) + (Math.random() * 50);
    callback(humidity);
});