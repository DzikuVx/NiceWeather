var NiceWeather = NiceWeather || {};

NiceWeather.controller = (function ($scope) {

    'use strict';

    var self = {};

    self.init = function () {
        NiceWeather.model.load(self.onDataLoaded);
    };

    self.onDataLoaded = function () {
        var i,
            $now,
            data;

        for (i = -1; i < 2; i++) {

            if (i === -1) {
                data = NiceWeather.model.getNow();
                $now = $scope.find('#weather-now');
            } else {
                data = NiceWeather.model.getForecast(i);
                $now = $scope.find('#weather-' + i);
            }

            $now.find(".readouts__icon").attr("src", data.icon);

        }
    };

    return self;
})($(".readouts"));