(function() {
	angular.module("app").controller("CaruselCtrl", function($scope, connect) {

		$scope.cards = [
		{
			right:{
				description : 'deska tarasowa blooma swierk 2400 x 144 x 27 mm brazowa',
				price:'29.96',
				src:'assets/img/board-1.jpg',
				paramBoardX : '144',
				paramBoardY : '2400'
			}
		},
		{
			right:{
				description : 'deska tarasowa blooma MODRZEW EUROPEJSKI 2500 x 140 x 24 mm',
				price:'29.96',
				src:'assets/img/board-2.jpg',
				paramBoardX : '140',
				paramBoardY : '2500'
			},
			left:{
				description : 'deska tarasowa blooma SOSNA 20 x 95 x 2400 mm zielona',
				price:'9.96',
				src:'assets/img/board-3.jpg',
				paramBoardX : '95',
				paramBoardY : '2400'
			}
		},
		{
			right:{
				description : 'deska tarasowa blooma MODRZEW EUROPEJSKI 2500 x 140 x 24 mm',
				price:'29.96',
				src:'assets/img/board-2.jpg',
				paramBoardX : '140',
				paramBoardY : '2500'
			},
			left:{
				description : 'deska tarasowa blooma SOSNA 20 x 95 x 2400 mm zielona',
				price:'9.96',
				src:'assets/img/board-3.jpg',
				paramBoardX : '95',
				paramBoardY : '2400'
			}
		}
		];
		$scope.activeMenu = $scope.cards[0];
		$scope.setActive = function(menuItem) {
    		$scope.activeMenu = menuItem;	
 		}

		$scope.caruselClass = [];
		$scope.positionItems = {};

		$scope.positionItems[1] = '0';
    	$scope.positionItems[2] = '1';

		$scope.nextFunc =  connect.next;
		$scope.prevFunc =  connect.prev;

		$scope.positionClasses = connect.getPositionClasses($scope.cards, $scope.positionItems);

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
			$scope.nextFunc($scope.cards, $scope.positionItems);
			$scope.caruselGiveClass();
		};

		$scope.prev = function() {
			$scope.prevFunc($scope.cards, $scope.positionItems);
			$scope.positionClasses = connect.getPositionClasses($scope.cards, $scope.positionItems);
			$scope.caruselGiveClass();
		};
	});
})()
;