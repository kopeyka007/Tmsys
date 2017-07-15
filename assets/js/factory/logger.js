(function () {
    'use strict';

    angular.module('app').factory('logger', [logger]);

    function logger() {

        toastr.options = {
            "closeButton": true,
            "positionClass": "toast-bottom-right",
            "timeOut": "3000"
        };

        var logIt = function(message, vars, type) {
            return toastr[type](message);
        };

        return {
            log: function(message, vars) {
                logIt(message, vars, 'info');
            },
            logWarning: function(message, vars) {
                logIt(message, vars, 'warning');
            },
            logSuccess: function(message, vars) {
                logIt(message, vars, 'success');
            },
            logError: function(message, vars) {
                logIt(message, vars, 'error');
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

                var data = JSON.parse(data.data);
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