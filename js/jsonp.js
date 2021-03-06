/* jsonp.js, (c) Przemek Sobstel 2012, License: MIT */

var NiceWeather = NiceWeather || {};

NiceWeather.jsonp = (function(){
    var self = {};

    /**
     * @param {String} src
     * @param {Object} options
     */
    self.send = function(src, options) {
        var callback_name = options.callbackName || 'callback',
            on_success = options.onSuccess || function(){},
            on_timeout = options.onTimeout || function(){},
            timeout = options.timeout || 10;

        var timeout_trigger = window.setTimeout(function(){
            window[callback_name] = function(){};
            on_timeout();
        }, timeout * 1000);

        window[callback_name] = function(data){
            window.clearTimeout(timeout_trigger);
            on_success(data);
        };

        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = src;

        document.getElementsByTagName('head')[0].appendChild(script);
    };

    return self;
})();