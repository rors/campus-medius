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

    function randomIntFromInterval(min,max) {
        return Math.random()*(max-min+1)+min;
    }
    for(var i=0; i<20; i++) {
        // start times are in the morning; end times are in afternoon
        var start = new Date('May 13, 1933');
        var startHour = randomIntFromInterval(0, 11);
        var startMinute = randomIntFromInterval(0, 59);
        start.setHours(startHour, startMinute);

        var end = new Date('May 13, 1933');
        var endHour = randomIntFromInterval(12, 23);
        var endMinute = randomIntFromInterval(0, 59);
        end.setHours(endHour, endMinute);

        var newObject = {
            id: (i+1),
            body: "i am a body",
            lat: randomIntFromInterval(50.7, 51),
            lng: randomIntFromInterval(2, -2),
            title: "title " + i,
            start: start,
            end: end,
            message: "",
            political: political[Math.floor(Math.random()*political.length)],
            historical: historical[Math.floor(Math.random()*historical.length)]
        }
        data.actors.push(newObject);
    }

    return data;
}