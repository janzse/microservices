const cote = require('cote');

const alarmPublisher = new cote.Publisher({
    name: 'alarm publisher',
    namespace: 'alarm',
    broadcasts: ['alarm']
});

let temp2Subscriber = new cote.Subscriber({
    name: 'temperature 2 subscriber',
    namespace: 'alarm',
    respondsTo: ['temp2-data']
});

let state;
temp2Subscriber.on('temp2-data', (temperature) => {
    if (temperature.value > 25) {
        if (state !== temperature.value) {
            let temp_status = {
                description: 'Alarm',
                value: temperature.value,
                timestamp: new Date()
            };
            console.log(temp_status);
            alarmPublisher.publish('temp2-data', temp_status);
            state = temperature.value;
        }
    }
});