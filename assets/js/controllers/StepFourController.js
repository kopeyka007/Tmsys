(function() {
	angular.module("app").controller("StepFourController", function($rootScope, $scope, $location, $routeParams, print,  request, connect) {
		$scope.calculate();
		$scope.tab = 1;

	    $scope.setTab = function(newTab){
	       $scope.tab = newTab;
	    };

	    $scope.isSet = function(tabNum){
	       return $scope.tab === tabNum;
	    };
		
	});
})()
;