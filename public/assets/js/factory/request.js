(function () {
    'use strict';

    angular.module('app').factory('request', ['$http', '$rootScope', 'logger', request]);

    function request($http, $rootScope, logger) {

    	return {
    		send: function(adrress, post_mas, callback, method) {
    			callback = callback || false;
    			method = method || 'post';

    			post_mas._token = $rootScope.token;
    			post_mas._method = method;

    			$http.post(adrress, post_mas).then(function(response) {
                    var data = logger.check(response.data);
    				if (callback && response.data)
					{
						(callback)(response.data);
					}
    			});
    		}
    	};
    };
})();

;