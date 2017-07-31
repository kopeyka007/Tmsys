(function() {
	angular.module("app").controller("StepThreeController", function($rootScope, $scope, $location, $routeParams,  print, connect, toastr) {
		$scope.terraceInner = {'x': [0, 0], 'y': [0, 0] , 'z':[0, 0]};

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

		$scope.validationForm = function () {
			$scope.terrace.x[0] = $scope.terraceInner.x[0];
			$scope.terrace.x[1] = $scope.terraceInner.x[1];

			$scope.terrace.y[0] = $scope.terraceInner.y[0];
			$scope.terrace.y[1] = $scope.terraceInner.y[1];

			$scope.terrace.z[0] = $scope.terraceInner.z[0];
			$scope.terrace.z[1] = $scope.terraceInner.z[1];

			var XA = $scope.terraceSize.terraceXA;
			var YA = $scope.terraceSize.terraceYA;
			var YB0 = $scope.terraceSize.terraceYB0;
			var YB1 = $scope.terraceSize.terraceYB1;
			var YC1 = $scope.terraceSize.terraceYC1;
			var XC1 = $scope.terraceSize.terraceXC1;
			var XD1 = $scope.terraceSize.terraceXD1;
			var Z1 = $scope.terraceSize.terraceZ1;
			var Z0 = $scope.terraceSize.terraceZ0;

			if ($scope.v.type == 0)
			{
				if ( XA.$viewValue || YB0.$viewValue )
				{
					$scope.validation('Please enter a number greater than zero');
				}
				else
				{
					$scope.changeRoute('/step-four', 'slide-left');
				}
			}
			else if ($scope.v.type == 1 || $scope.v.type == 2)
			{
				if (XA.$viewValue || YA.$viewValue  || YB0.$viewValue || XD1.$viewValue )
				{
					$scope.validation('Please enter a number greater than zero');
				}
				else
				{
					$scope.changeRoute('/step-four', 'slide-left');
				}
			}
			else if ($scope.v.type == 3)
			{
				if (XA.$viewValue || YA.$viewValue || YB0.$viewValue || XD1.$viewValue || Z0.$viewValue || Z1.$viewValue)
				{
					$scope.validation('Please enter a number greater than zero');
				}
				else
				{
					$scope.changeRoute('/step-four', 'slide-left');
				}
			}
		};

		$scope.resetFormFigure = function () {
			$scope.terraceSize.$setPristine();
			$scope.terraceSize.$setUntouched();
			$scope.terraceInner = {'x': [0, 0], 'y': [0, 0] , 'z':[0, 0]};
		};
		
	});
})()
;