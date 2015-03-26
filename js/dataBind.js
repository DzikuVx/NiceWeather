var NiceWeather = NiceWeather || {};

NiceWeather.dataBind = (function($) {

    'use strict';

    var self = {};

    self.update = function(data, $scope) {

        /* istanbul ignore if */
        if (!$scope) {
            $scope = $(document);
        }

        $scope.find('[data-bind]').each(function() {
            var $this = $(this),
                key = $this.data('bind'),
                split = key.split('.'),
                i,
                clonedData = $.extend(true, {}, data),
                localKey,
                maxLevel = split.length - 1;

            for (i in split) {
                if (split.hasOwnProperty(i)) {
                    localKey = split[i];

                    if (typeof clonedData[localKey] !== 'undefined') {
                        if (i == maxLevel) {
                            $this.html(clonedData[localKey]);
                        } else {
                            clonedData = clonedData[localKey];
                        }
                    }
                }
            }
        });

        return NiceWeather.dataBind;
    };

    return self;
})(jQuery);