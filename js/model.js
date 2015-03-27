var NiceWeather = NiceWeather || {};

NiceWeather.model = (function (storage) {

    'use strict';

    var self = {},
        response;

    self.load = function (callback) {

        var stored = self.getFromCache();

        if (stored) {
            console.log("from cache");
            response = stored;
            callback();
        } else {
            console.log("we have to get from outside");
            self.getFromServer(callback);
        }
    };

    self.getFromServer = function (callback) {
        var callbackName = 'modelCallback' + Math.round(Math.random() * 1000);

        NiceWeather.jsonp.send('http://weather.spychalski.info/api.php?callback=' + callbackName, {
            callbackName: callbackName,
            onSuccess: function (data) {
                storage.set("weatherData", data, 1800);
                response = data;
                callback(data);
            }
        });
    };

    self.getFromCache = function () {
        return storage.get("weatherData");
    };

    self.getNow = function() {
        return {
            icon: './img/icons/icon_' + response['WeatherIcon'] + '.png',
            temperature: {
                now: Math.round(parseFloat(response['Temperature'])),
                day: null,
                night: null,
                max: null,
                min: null
            },
            pressure: Math.round(parseFloat(response['Pressure'])),
            humidity: Math.round(parseFloat(response['Humidity'])),
            wind: {
                speed: Math.round(parseFloat(response['WindSpeed'])),
                direction: Math.round(parseFloat(response['WindDirection']))
            }
        }
    };

    self.getForecast = function(index) {
        var forecast = response['Forecast'][index];

        return {
            icon: './img/icons/icon_' + forecast['WeatherIcon'] + '.png',
            temperature: {
                now: null,
                day: Math.round(parseFloat(forecast['TempDay'])),
                night: Math.round(parseFloat(forecast['TempNight'])),
                max: Math.round(parseFloat(forecast['TempMax'])),
                min: Math.round(parseFloat(forecast['TempMin']))
            },
            pressure: Math.round(parseFloat(forecast['Pressure'])),
            humidity: Math.round(parseFloat(forecast['Humidity'])),
            wind: {
                speed: Math.round(parseFloat(forecast['WindSpeed'])),
                direction: Math.round(parseFloat(forecast['WindDirection']))
            }
        }
    };

    return self;
})(NiceWeather.storage);