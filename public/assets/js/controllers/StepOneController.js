(function() {
	angular.module("app").controller("StepOneController", function($rootScope, $scope, $location, $routeParams, print, connect, request) {
		request.send('/api/steptwo/index', {}, function(data){

		});
	});
})()
;