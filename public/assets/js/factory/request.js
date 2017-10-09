(function () {
    'use strict';

    angular.module('app').factory('request', ['$http', '$rootScope', request]);

    function request($http, $rootScope) {

    	return {
    		send: function(adrress, post_mas, callback, method) {
    			callback = callback || false;
    			method = method || 'post';

    			post_mas._token = $rootScope.token;
    			post_mas._method = method;

    			$http.post(adrress, post_mas).then(function(response) {
    				if (callback)
					{
						(callback)(response);
					}
    			});
    		}
    	};
    };
})();

;