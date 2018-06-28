const cote = require('cote');

const bright2Responder = new cote.Responder({
    name: 'brightness 2 responder',
    namespace: 'sensor',
    respondsTo: ['brightness-data']
});

let bright2Publisher = new cote.Publisher({
    name: 'brightness 2 publisher',
    namespace: 'sensor',
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

function publishBrightness2()
{
    bright2Publisher.publish('brightness-data', bright_status);
}

setInterval(publishBrightness2, 1000);