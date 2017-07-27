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

	    $scope.getArrayMaterials = function () { 
			request.send('/backEnd/material.json', {}, function(data) {
				$scope.materials  = data.data;
			});
		};

		$scope.getArrayMaterials();
		console.log($scope.materials);
	});
})()
;