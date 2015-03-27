var NiceWeather = NiceWeather || {};

NiceWeather.controller = (function ($scope) {

    'use strict';

    var self = {};

    self.init = function () {
        NiceWeather.model.load(self.onDataLoaded);
    };

    self.onDataLoaded = function () {
        var i,
            $container,
            data;

        for (i = -1; i < 2; i++) {

            if (i === -1) {
                data = NiceWeather.model.getNow();
                $container = $scope.querySelector('#weather-now');
            } else {
                data = NiceWeather.model.getForecast(i);
                $container = $scope.querySelector('#weather-' + i);
            }

            $container.getElementsByClassName("readout__icon")[0].src = data.icon;
            NiceWeather.dataBind.update(data, $container);
        }
    };

    return self;
})(document.getElementsByClassName('readouts')[0]);