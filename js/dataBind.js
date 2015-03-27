var NiceWeather = NiceWeather || {};

NiceWeather.dataBind = (function() {

    'use strict';

    var self = {};

    /**
     * @param {Object} data
     * @param {Object=} $scope
     * @return {NiceWeather.dataBind}
     */
    self.update = function(data, $scope) {

        if (!$scope) {
            $scope = document;
        }

        var $elements = $scope.querySelectorAll('[data-bind]'),
            elementIndex;

        for (elementIndex = 0; elementIndex < $elements.length; elementIndex++) {

            var $this = $elements[elementIndex],
                key = $this.dataset.bind,
                split = key.split('.'),
                i,
                clonedData = JSON.parse(JSON.stringify(data)),
                localKey,
                maxLevel = split.length - 1;

            for (i in split) {
                if (split.hasOwnProperty(i)) {
                    localKey = split[i];

                    if (typeof clonedData[localKey] !== 'undefined') {
                        if (i == maxLevel) {
                            $this.innerHTML = clonedData[localKey];
                        } else {
                            clonedData = clonedData[localKey];
                        }
                    }
                }
            }
        }

        return NiceWeather.dataBind;
    };

    return self;
})();