const cote = require('cote');

const alarmResponder = new cote.Responder({
    name: 'alarm responder',
    namespace: 'alarm',
    respondsTo: ['alarm-data']
});

const alarmPublisher = new cote.Publisher({
    name: 'alarm publisher',
    namespace: 'alarm',
    broadcasts: ['alarm-data']
});

let temp2Subscriber = new cote.Subscriber({
    name: 'temperature 2 subscriber',
    namespace: 'temp2',
    respondsTo: ['temp2-data']
});

alarmResponder.on('alarm-data');

temp2Subscriber.on('temp2-data', (temperature) => {
    if (temperature.value >= 30) {
        let alarm_status = {
            description: 'Alarm',
            value: temperature.value,
            timestamp: new Date()
        };
        alarmPublisher.publish('alarm-data', alarm_status);
    }
});