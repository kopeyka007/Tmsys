(function () {
    'use strict';

    angular.module('app').factory('logger', [logger]);

    function logger() {
        
        toastr.options = {
            "closeButton": true,
            "positionClass": "toast-bottom-right",
            "timeOut": "3000"
        };

        var logIt = function(message, type) {
            return toastr[type](message);
        };

        return {
            log: function(message) {
                logIt(message, 'info');
            },
            logWarning: function(message) {
                logIt(message, 'warning');
            },
            logSuccess: function(message) {
                logIt(message, 'success');
            },
            logError: function(message) {
                logIt(message, 'error');
            },
			check: function(data) {
                if (data.messages)
				{
					for (var key in data.messages)
					{
                        var message = data.messages[key];
						this[this.method(message.type)](message.text);
					}
				}

                if (data)
                {
					return data;
				}
				else
				{
					return false;
				}
            },
            method: function(type) {
                return 'log' + type.charAt(0).toUpperCase() + type.slice(1);
            }
        };
    };
})();

;