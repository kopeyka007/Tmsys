(function() {
	angular.module("app").controller("StepTwoController", function($rootScope, $scope, $location, $routeParams, print, connect, request, toastr) {

		request.send('/api/stepOne/getBoards', {}, function(data) {
			$scope.cards = data.data;
			$scope.typeDeska($scope.deska);
		});

		$scope.typeDeska = function(type) { //выбор между композитной и деревенной первый шаг
			$scope.deska = type;
			$scope.cardsList = [];

			if ($scope.deska == 'wooden')
			{
				$scope.cards.filter(function(item, i, arr) {

					if (item.type_board == 'wooden')
					{
						$scope.cardsList.push(item);
					}
				});
			}
			if ($scope.deska == 'composite')
			{
				$scope.cards.filter(function(item, i, arr) {

					if (item.type_board == 'composite')
					{
						$scope.cardsList.push(item);
					}
				});
			}
		};



		/* C A R U S E L */
		$scope.caruselClass = [];
		$scope.positionItems = {};

		$scope.positionItems[1] = '0';
    	$scope.positionItems[2] = '1';
    	$scope.positionItems[3] = '2';
    	$scope.positionItems[4] = '3';

		$scope.nextFunc =  connect.next;
		$scope.prevFunc =  connect.prev;

		$scope.positionClasses = connect.getPositionClasses($scope.cardsList, $scope.positionItems);

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
			$scope.nextFunc($scope.cardsList, $scope.positionItems);
			$scope.caruselGiveClass();
		};

		$scope.prev = function() {
			$scope.prevFunc($scope.cardsList, $scope.positionItems);
			$scope.positionClasses = connect.getPositionClasses($scope.cardsList, $scope.positionItems);
			$scope.caruselGiveClass();
		};
		/*E N D  C A R U S E L */
		$scope.validationForm = function () {
			if ($scope.formBoard.$invalid)
			{
				$scope.validation('Please enter an integer greater than zero');
			}
			else
			{
				$scope.changeRoute('/step_three', 'slide-left');
			}
		};

	});
})()
;