var NiceWeather = NiceWeather || {};

NiceWeather.model = (function ($, storage) {

    var self = {};

    self.load = function (callback) {

        var stored = self.getFromCache();

        if (stored) {
            console.log("from cache");
            callback(stored);
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
                callback(data);
            }
        });

    };

    self.getFromCache = function () {
        return storage.get("weatherData");
    };

    return self;
})(jQuery, NiceWeather.storage);