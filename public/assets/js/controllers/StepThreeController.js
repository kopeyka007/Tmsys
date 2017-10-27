(function() {
	angular.module("app").controller("StepThreeController", function($rootScope, $scope, $location, $routeParams, print, connect, request, toastr) {
		
		if($scope.cards != false) 
		{
			$scope.getParamBoards();
		}
		else
		{
			request.send('/api/stepone/getBoards', {}, function(data) {
				$scope.cards = data.data;
				$scope.getParamBoards();
			});
		}

		//Подсветка бордеров
		$scope.borderFigureLeft = false;
		$scope.borderFigureTwoTop = false;
		$scope.borderFigureTwoLeft = false;
		$scope.borderFigureBottom = false;
		$scope.trapezeRight = false;
		$scope.trapezeTop = false;

		/*C A R U S E L*/
		$scope.figures = [
			{
				src:'/storage/images/rectangle.png'
			},
			{
				src:'/storage/images/rectangle-two.png'
			},
			{
				src:'/storage/images/rectangle-circle.png'
			},
			{
				src:'/storage/images/trapeze.png'
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
		/*E N D  C A R U S E L*/
		$scope.terraceInner = {'x': ['', ''], 'y': ['', ''] , 'z':['', '']};

		$scope.validationForm = function () {
			$scope.terrace.x[0] = $scope.terraceInner.x[0] * 1;
			$scope.terrace.x[1] = $scope.terraceInner.x[1] * 1;

			$scope.terrace.y[0] = $scope.terraceInner.y[0] * 1;
			$scope.terrace.y[1] = $scope.terraceInner.y[1] * 1;

			$scope.terrace.z[0] = $scope.terraceInner.z[0] * 1;
			$scope.terrace.z[1] = $scope.terraceInner.z[1] * 1;
			
			$scope.XA = $scope.terraceSize.terraceXA;
			$scope.YA = $scope.terraceSize.terraceYA;
			$scope.YB0 = $scope.terraceSize.terraceYB0;
			$scope.YB1 = $scope.terraceSize.terraceYB1;
			$scope.YC1 = $scope.terraceSize.terraceYC1;
			$scope.XC1 = $scope.terraceSize.terraceXC1;
			$scope.XD1 = $scope.terraceSize.terraceXD1;
			$scope.Z1 = $scope.terraceSize.terraceZ1;
			$scope.Z0 = $scope.terraceSize.terraceZ0;

			if ($scope.v.type == 0)
			{
				if ( $scope.XA.$viewValue == false || $scope.YB0.$viewValue == false )
				{
					return $scope.validation('Please enter a number greater than zero');
				}
				else
				{
					$scope.changeRoute('/step_four/', 'slide-left', $scope.const); 
					$rootScope.calculate();
				}
			}
			else if ($scope.v.type == 1 || $scope.v.type == 2)
			{
				if ($scope.XA.$viewValue == false || $scope.YC1.$viewValue == false  || $scope.YB0.$viewValue == false || $scope.XD1.$viewValue == false )
				{
					return $scope.validation('Please enter a number greater than zero');
				}
				else
				{
					$scope.changeRoute('/step_four/', 'slide-left', $scope.const); 
					$rootScope.calculate();
				}
			}
			else if ($scope.v.type == 3)
			{
				if ($scope.YA.$viewValue == false || $scope.YB1.$viewValue == false || $scope.YC1.$viewValue == false || $scope.XD1.$viewValue == false || $scope.Z0.$viewValue == false || $scope.Z1.$viewValue == false)
				{
					return $scope.validation('Please enter a number greater than zero');
				}
				else
				{
					$scope.changeRoute('/step_four/', 'slide-left', $scope.const); 
					$rootScope.calculate();
				}
			}
		};

		$scope.resetFormFigure = function () {
			$scope.terraceSize.$setPristine();
			$scope.terraceSize.$setUntouched();
			$scope.terraceInner = {'x': ['', ''], 'y': ['', ''] , 'z':['', '']};
		};

	});
})()
;