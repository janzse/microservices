const cote = require('cote');

const bright2Responder = new cote.Responder({
    name: 'Brightness Service 2',
    namespace: 'brightness',
    respondsTo: ['bright2']
});

let bright2Publisher = new cote.Publisher({
    name: 'brightness 2 publisher',
    namespace: 'brightness',
    broadcasts: ['bright2']
});

let brightness;

bright2Responder.on('bright2', (request, callback) => {
    // helligkeit abfragen
    brightness = Math.floor(Math.random() * (255 - 200) + (Math.random() * 200));
    callback(brightness);
});

function updateBrightness()
{
    bright2Publisher.publish('bright2', brightness);
}

setInterval(updateBrightness, 1000);
