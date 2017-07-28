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

		$scope.totalSum = function(obj, countFirst, countSecond) {
			var countSecond = countSecond || 0;
			var priceSecondBoard = obj.priceSecondBoard || 0;

			var a = countFirst * obj.priceFirstBoard;
			var b = obj.priceKlips * obj.priceKlipsQuantity;
			var c = obj.priceLegar * obj.priceLegarQuantity;
			var d = obj.priceKantovka * obj.priceKantovkaQuantity;
			var e = countSecond * priceSecondBoard;

			return $scope.total = ((a + b + c + d + e).toFixed(2));
			
		}
	});
})()
;