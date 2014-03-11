exports.run = function() {
    var data = {};

    data.actors = [];
    var objectTemplate = { 
        "id": 1, 
        "body": "foo",
        "lat": 51.505,
        "lng": -0.09,
        "title": "first title",
        "start": "8am",
        "end": "2pm",
        "message": "",
        "political": "Nazi",
        "historical": "Sovereign"
    },
    political = ['Socialist', 'Nazi', 'Bourgeois', 'Liberal'],
    historical = ['Sovereign', 'Disciplinary', 'Control'];

    function randomNumberFromInterval(min,max, isInt) {
        var rand = Math.random()*(max-min+1)+min;
        return isInt ? Math.floor(rand) : rand;
    }

    for(var i=0; i<20; i++) {
        // start times are in the morning; end times are in afternoon
        var start = new Date('May 13, 1933');
        var startHour = randomNumberFromInterval(0, 11);
        var startMinute = randomNumberFromInterval(0, 59);
        start.setHours(startHour, startMinute);

        var end = new Date('May 13, 1933');
        var endHour = randomNumberFromInterval(12, 23);
        var endMinute = randomNumberFromInterval(0, 59);
        end.setHours(endHour, endMinute);

        var newObject = {
            id: (i+1),
            body: "i am a body",
            lat: randomNumberFromInterval(50.7, 51),
            lng: randomNumberFromInterval(2, -2),
            title: "title " + i,
            start: randomNumberFromInterval(1, 24, true),
            end: 24,
            message: "",
            political: political[Math.floor(Math.random()*political.length)],
            historical: historical[Math.floor(Math.random()*historical.length)]
        }
        data.actors.push(newObject);
    }

    return data;
}