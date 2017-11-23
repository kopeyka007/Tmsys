(function() {
	angular.module("app").controller("AdminController", function($rootScope, $http, $scope, $window, $location, $routeParams, print, request, connect, Upload, logger) {
		
		request.send('/api/stepone/getBoards', {}, function(data) {
			$scope.cards = data.data;
			$scope.cardsList = $scope.cards;
		});

		$scope.checkBoard = function (text) {
			logger.logSuccess(text);
		}

		$scope.add = function () {
			if ($scope.addBoard.$invalid)
			{
				return $scope.validation('Please enter fields');
			}

			if ($scope.addBoard.$valid)
			{

				var addBoards = {};
		    	addBoards.terrace_img = $scope.terrace_img;
		    	addBoards.board_img = $scope.board_img;

		    	addBoards.name = $scope.name;
		    	addBoards.brand = $scope.brand;
		    	addBoards.height = $scope.height;
		    	addBoards.width = $scope.width;
		    	addBoards.thickness = $scope.thickness;
		    	addBoards.type = $scope.type;
		    	addBoards.price = $scope.price;

		    	$scope.btn_board_panel ? addBoards() : false;

		    	Upload.upload({
                    url: '/api/admin/addBoard',
                    data: addBoards
                }).then(function (response) {
                   	$scope.resetForm();
					$scope.checkBoard('You added board!');
                    //window.location.reload();
                });
			}
		}

		$scope.addBoards = function() {
	    	addBoards.nameSecond = $scope.nameSecond;
	    	addBoards.brandSecond = $scope.brandSecond;
	    	addBoards.heightSecond = $scope.heightSecond;
	    	addBoards.widthSecond = $scope.widthSecond;
	    	addBoards.thicknessSecond = $scope.thicknessSecond;
	    	addBoards.typeSecond = $scope.typeSecond;
	    	addBoards.priceSecond = $scope.priceSecond;
		}

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