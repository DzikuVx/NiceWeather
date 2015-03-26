var NiceWeather = NiceWeather || {};

NiceWeather.model = (function ($, storage) {

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
        $.ajax({
            dataType: "jsonp",
            url: "http://weather.spychalski.info/api.php",
            success: function (data) {
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
            icon: './img/icons/icon_' + response['WeatherIcon'] + '.png'
        }
    };

    self.getForecast = function(index) {
        var forecast = response['Forecast'][index];

        return {
            icon: './img/icons/icon_' + forecast['WeatherIcon'] + '.png'
        }
    };

    return self;
})(jQuery, NiceWeather.storage);