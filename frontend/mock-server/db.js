exports.run = function() {
    var data = {};

    data.actors = [];
    var objectTemplate = { 
        "id": 1, 
        "body": "foo",
        "lat": 48.20817,
        "lng": 16.37382,
        "title": "first title",
        "start": "8am",
        "end": "2pm",
        "message": "",
        "historical": "Sovereign"
    },
    historical = ['Sovereign', 'Disciplinary', 'Control'];
    colors = ['B2241A', '1E578F', 'EAFB58']

    function randomNumberFromInterval(min,max, isInt) {
        var rand = Math.random()*(max-min+1)+min;
        return isInt ? Math.floor(rand) : rand;
    }

    for(var i=0; i<15; i++) {
        // start times are in the morning; end times are in afternoon

        var start = randomNumberFromInterval(1, 22, true);
        var end = randomNumberFromInterval(start+1, start+4, true);
        if(end>24) end=24;
        var startPercent = start/24 * 100;
        var endPercent = end/24 * 100;
        var historicalIndex = Math.floor(Math.random()*historical.length);
        var newObject = {
            id: (i+1),
            body: "i am a body",
            lat: randomNumberFromInterval(47.5, 48),
            lng: randomNumberFromInterval(16, 17),
            title: "Actor ID: " + (i+1),
            start: start,
            startPercent: startPercent,
            end: end,
            endPercent: endPercent,
            message: "",
            historical: historical[historicalIndex],
            color: colors[historicalIndex]
        }
        data.actors.push(newObject);
    }

    data.actors.sort(function(a, b) {
        if(a.start < b.start) {
            return -1;
        }

        if(a.start > b.start) {
            return 1;
        }

        if(a.end < b.end) {
            return -1
        }
        if(a.end > b.end) {
            return 1;
        }

        return 0;
    });
    return data;
}