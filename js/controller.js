var NiceWeather = NiceWeather || {};

NiceWeather.controller = (function ($, $scope) {

    var self = {};

    self.init = function () {
        NiceWeather.model.load(self.onDataLoaded);
    };

    self.onDataLoaded = function (data) {
        var $now = $scope.find("#weather-now");

        $now.find(".readouts__icon").attr("src", './img/icons/icon_' + data['WeatherIcon'] + '.png');
    };

    return self;
})(jQuery, $(".readouts"));