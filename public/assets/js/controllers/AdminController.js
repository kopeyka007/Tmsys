(function() {
	angular.module("app").controller("AdminController", function($rootScope, $scope, $window, $location, $routeParams, print,  request, connect) {
		
		request.send('/api/stepone/getBoards', {}, function(data) {
			$scope.cards = data.data;
		});

		$scope.cardsList = $scope.cards;

		$scope.add = function () {
			if ($scope.addBoard.$invalid)
			{
				return $scope.validation('Please enter fields');
			}

			if ($scope.addBoard.$valid)
			{
				request.send("/api/addBoard", { 
					terrace_img : $scope.terrace_img,
					board_img : $scope.board_img,
					name : $scope.name,
					brand : $scope.brand,
					height : $scope.height,
					width : $scope.width,
					thickness : $scope.thickness,
					type : $scope.type,
					price : $scope.price,
				}, function(data){
					if (data.data)
					{
						
					}
				});
				$scope.resetForm();
			}
		};

		$scope.resetForm = function () {
			$scope.addBoard.$setPristine();
			$scope.addBoard.$setUntouched();
			$scope.addBoard.$rollbackViewValue();
			$scope.terrace_img = '';
			$scope.board_img = '';
			$scope.name = '';
			$scope.brand = '';
			$scope.height = '';
			$scope.width = '';
			$scope.thickness = '';
			$scope.type = '';
			$scope.price = '';
		}
	});

})()