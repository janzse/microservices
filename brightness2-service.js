const cote = require('cote');
const getBright2 = new cote.Responder({name: 'Brightness Service 2'});

getBright2.on('brightness 2', (request, callback) => {
    // helligkeit abfragen
    let brightness = Math.floor(Math.random() * (255 - 200) + (Math.random() * 200));
    callback(brightness);
});