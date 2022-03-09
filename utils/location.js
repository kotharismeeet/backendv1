const getVendorLocation = () => {
    const success = (pos) => {
        return {
            latitude : pos.coords.latitude,
            longitude: pos.coords.longitude 
        }
    }

    const error = (err) => {
        console.log(err);
        return {
            err
        };
    }

    
    const coordinates = navigator.geolocation.getCurrentPosition(success, error, [{timeout: 5000}])
    console.log(coordinates);
    return coordinates;
}

getVendorLocation();