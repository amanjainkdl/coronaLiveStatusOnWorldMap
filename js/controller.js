let update = function () {
    let countriesWithLatLon = {}
    fetch('countriesWithAdress.json').then(response => {
        return response.json();
    }).then(data => {
        countriesWithLatLon = data;
    });
    fetch('https://api.covid19api.com/summary').then(response => {
        return response.json();
    }).then(data => {
        data['Countries'].forEach(element => {
            let color = element.TotalConfirmed;
           let latitudeLongitude = countriesWithLatLon[element.CountryCode] ? countriesWithLatLon[element.CountryCode].split(',') : '';           
           latitudeLongitude != '' ? new mapboxgl.Marker({
               color : `rgb(${color},0,0)`
           })
           .setLngLat([latitudeLongitude[1], latitudeLongitude[0]])
           .addTo(map) : '';
        });
    });
}

update();