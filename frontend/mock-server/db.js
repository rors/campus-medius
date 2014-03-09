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
        var newObject = {
            id: (i+1),
            body: "i am a body",
            lat: randomIntFromInterval(50.7, 51),
            lng: randomIntFromInterval(2, -2),
            title: "title " + i,
            start: "8am",
            end: "2pm",
            message: "",
            political: political[Math.floor(Math.random()*political.length)],
            historical: historical[Math.floor(Math.random()*historical.length)]
        }
        data.actors.push(newObject);
    }

    return data;
}