(function() {
	angular.module("app").controller("CaruselFigureCtrl", function($scope, connect) {

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

		$scope.figures = [
			{
				src:'/assets/img/rectangle.png'
			},
			{
				src:'/assets/img/rectangle-two.png'
			},
			{
				src:'/assets/img/rectangle-circle.png'
			},
			{
				src:'/assets/img/trapeze.png'
			}
		];

		$scope.caruselClass = [];

		$scope.nextFunc =  connect.next;
		$scope.prevFunc =  connect.prev;

		$scope.positionClasses = connect.getPositionClasses($scope.figures);

		$scope.caruselGiveClass = function() {
			for (var key in  $scope.positionClasses)
            {
            	if ($scope.positionClasses[key] == "after")
            	{
            		$scope.caruselClass[key] = "sliderAfter";
            	}

            	if ($scope.positionClasses[key] == "before")
            	{
            		$scope.caruselClass[key] = "sliderBefore";
            	}

            	if ($scope.positionClasses[key] != "after" && $scope.positionClasses[key] != "before")
            	{
            		$scope.caruselClass[key] = 'slider' + $scope.positionClasses[key];
            	}
            }
		};

		$scope.caruselGiveClass();

		$scope.next = function() {
			$scope.nextFunc($scope.figures);
			$scope.caruselGiveClass();
		};

		$scope.prev = function() {
			$scope.prevFunc($scope.figures);
			$scope.positionClasses = connect.getPositionClasses($scope.figures);
			$scope.caruselGiveClass(); 
		};
	});
})()
;