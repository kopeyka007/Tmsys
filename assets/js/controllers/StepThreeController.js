(function() {
	angular.module("app").controller("StepThreeController", function($rootScope, $scope, $location, $routeParams,  print, connect) {
		
		$scope.getParamBoards = function () { // функция будет идти на бекенд за id
			var id = $routeParams.params;
			$scope.cardInfo = {};

			if (! id)
			{
				$scope.cardInfo = {
					firstBoard : "Parametry pokładzie :" + ' ' + $scope.board.y[0] + "X" + $scope.board.x + "X" + $scope.seam,
					priceFirstBoard: $scope.cena + ' .00',
					srcTerrace:"/assets/img/t-1.png",
					srcBoard:"/assets/img/board-drew-1.jpg",
					paramBoardX : $scope.board.x,
					paramBoardY : $scope.board.y[0]
				};
				console.log($scope.cena);
			}
			else
			{
				for (var i in $scope.cards) {
					if ($scope.cards[i].cardId == id)
					{
						$scope.cardInfo = $scope.cards[i];
					}
				}
			}
			
		};
	});
})()
;