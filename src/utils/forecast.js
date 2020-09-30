const request = require('postman-request');

function forecast(latitude, longitude, callback) {
  const url = 'http://api.weatherstack.com/current?access_key=68f8aca70b8c0503d66ad87f80622b01&query=' + latitude + ',' + longitude;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined);
    } else if (response.body.error) {
      callback('Unable to find location.', undefined);
    } else {
      const resEssential = `${response.body.current.weather_descriptions[0]}. It is currently ${response.body.current.temperature} degrees out. There is a ${response.body.current.precip}% chance of rain.`
      callback(undefined, resEssential);
    }
  });
}

module.exports = forecast;