const request = require('request')

const geodata = (address, callback) => {
    const geourl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicmFqdmlqYWluIiwiYSI6ImNsbGx5a2ZoejIxbWIza21wYnQ0c3p1ejEifQ.0lxMmf_5iPpG6Y-v_iKfVQ&limit=1'
    request({ url: geourl, json: true }, (error, response) => {
        
        if (error) {
            callback("Unable to connect", undefined)
        }

        else if (response.body.features[0] === undefined||response.body.features[0] === 0 ) {
            console.log(response.body.features[0])

            callback("Invalid Search", undefined)

        }
        else {
            const data = response.body.features[0];
            const place = {
                latitude :data.center[1],
                longitude :data.center[0],
                place_name:data.place_name
            }

            callback(undefined, place)

        }
    })
}

module.exports = geodata;