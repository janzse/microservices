const cote = require('cote');

const bright2Responder = new cote.Responder({
    name: 'brightness 2 responder',
    namespace: 'brightness',
    respondsTo: ['brightness-data']
});

let bright2Publisher = new cote.Publisher({
    name: 'brightness 2 publisher',
    namespace: 'brightness',
    broadcasts: ['brightness-data']
});

let bright_status;

bright2Responder.on('brightness-data', (request, callback) => {
    // helligkeit abfragen
    let brightness = Math.floor(Math.random() * (255 - 200) + (Math.random() * 200));
    bright_status = {
        description: 'Brightness',
        value: brightness,
        timestamp: new Date()
    };
    callback(brightness);
});

function publishBrightness()
{
    let brightness = Math.floor(Math.random() * (255 - 200) + (Math.random() * 200));
    bright_status = {
        description: 'Brightness',
        value: brightness,
        timestamp: new Date()
    };
    bright2Publisher.publish('brightness-data', bright_status);
}

setInterval(publishBrightness, 1000);