var NiceWeather = NiceWeather || {};

/**
 * localStorage with expire wrapper
 */
NiceWeather.storage = (function() {
    var self = {};

    /**
     * Method unsets value in localStorage
     */
    self.unset = function(key) {
        localStorage.removeItem(key);
    };

    /**
     * Method gets value from localStorage
     * @param key
     */
    self.get = function(key) {

        if (!localStorage[key]) {
            return null;
        }

        var object = JSON.parse(localStorage[key]);

        if (object.timestamp === null || new Date().getTime() < object.timestamp) {
            return object.value;
        } else {
            return null;
        }

    };

    /**
     * Method sets value in local storage
     *
     * @param key
     * @param value
     * @param expire in seconds
     */
    self.set = function(key, value, expire) {

        var object;

        if (!expire) {
            object = {
                value : value,
                timestamp : null
            };
        } else {
            object = {
                value : value,
                timestamp : new Date().getTime() + (expire * 1000)
            };
        }

        localStorage[key] = JSON.stringify(object);
    };

    return self;
})();