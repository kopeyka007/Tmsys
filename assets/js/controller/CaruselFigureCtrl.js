(function() {
	angular.module("app").controller("CaruselFigureCtrl", function($scope, connect) {

		$scope.figures = [
			{
				description : 'deska tarasowa blooma swierk 2400 x 144 x 27 mm ',
				price:'29.96',
				src:'assets/img/rectangle.png'
			},
			{
				description : 'deska tarasowa blooma MODRZEW EUROPEJSKI 2500 x 140 x 24 mm',
				price:'29.96',
				src:'assets/img/rectangle-two.png'
			},
			{
				description : 'deska tarasowa blooma SOSNA 20 x 95 x 2400 mm zielona ',
				price:'9.96',
				src:'assets/img/rectangle-circle.png'
			},
			{
				description : 'deska tarasowa blooma swierk 2400 x 144 x 27 mm brazowa',
				price:'29.96',
				src:'assets/img/trapeze.png'
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