(function() {
	angular.module("app").controller("StepFourController", function($rootScope, $scope, $location, $routeParams, print, connect) {
		$scope.calculate();
		console.log((($scope.boardsCount[2][0] * $scope.cardArr.priceFirstBoard) + ($scope.boardsCount[2][1] * $scope.cardArr.priceSecondBoard)).toString().split('.')[0]);
	});
})()
;