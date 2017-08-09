(function() {
	angular.module("app").controller("StepFourController", function($rootScope, $scope, $location, $routeParams, print,  request, connect) {
		$scope.tab = 0;
	    $scope.setTab = function(newTab) {
	       $scope.tab = newTab;
	    };

	    $scope.isSet = function(tabNum) {
	       return $scope.tab === tabNum;
	    };


	    $scope.totalSum = function(obj) {
	    	$scope.total = [];
	    	for (var i in $scope.boardsCount)
	    	{
	    		for (var k in $scope.boardsCount[i])
	    		{
					var priceSecondBoard = obj.priceSecondBoard || 0;
					var a = $scope.boardsCount[i][0] * obj.priceFirstBoard;
					var b = obj.priceKlips * obj.priceKlipsQuantity;
					var c = obj.priceLegar * obj.priceLegarQuantity;
					var d = obj.priceKantovka * obj.priceKantovkaQuantity;
					var e = $scope.boardsCount[i][1] * priceSecondBoard;

		    		$scope.total[i] = ((a + b + c + d + e).toFixed(2));
	    		}
	    	}
		}

		/*$scope.initData = function() {
			$scope.boardsCount = JSON.parse(localStorage.getItem('boardsCount'));
			$scope.const = $routeParams.params * 1;
			if ( ! $scope.cards)
			{
				$scope.getArrayBoards();
			}

			
			for (var i in $scope.cards) 
			{
				if ($scope.cards[i].cardId == $scope.const)
				{
					$scope.cardInfo = $scope.cards[i];
				}
			}
			
			$scope.totalSum($scope.cardInfo);
		};
		$scope.initData();
		*/
		
	});
})()
;