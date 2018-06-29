const cote = require('cote');

const alarmPublisher = new cote.Publisher({
    name: 'alarm publisher',
    namespace: 'alarm',
    broadcasts: ['alarm-data']
});

let temp2Subscriber = new cote.Subscriber({
    name: 'temperature 2 subscriber',
    namespace: 'alarm',
    respondsTo: ['temp2-data']
});

temp2Subscriber.on('temp2-data', (temperature) => {
    console.log(temperature);
    if (temperature.value > 25) {
        let temp_status = {
            description: 'Alarm',
            value: temperature.value,
            timestamp: new Date()
        };
        alarmPublisher.publish('alarm-data', temp_status);
    }
});