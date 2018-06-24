const cote = require('cote');
const getTemp2 = new cote.Responder({name: 'Temperature Service 2'});

getTemp2.on('temperature 2', (request, callback) => {
    let temperature = Math.floor((Math.random() * 40) + (Math.random() * 7));
    callback(temperature);
});