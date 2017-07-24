(function() {
	angular.module("app").controller("CaruselFigureCtrl", function($scope, connect) {

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