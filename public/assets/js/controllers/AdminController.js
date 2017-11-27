(function() {
	angular.module("app").controller("AdminController", function($rootScope, $timeout, $http, $scope, $window, $location, $routeParams, print, request, connect, Upload, logger) {
		
		if(! $scope.cardsList)
		{
			request.send('/api/stepone/getBoards', {}, function(data) {
				$scope.cards = data.data;
				$scope.cardsList = $scope.cards;
			});
		}

		$scope.addNew = function () {
			$scope.btn_board_visible = true;
			$scope.resetForm();
		}
		
		$scope.checkBoard = function (text) {
			logger.logSuccess(text);
		}

		$scope.parent = {};

		$scope.openEditBoards = function (id) {
			$scope.btn_board_visible = false;
			$scope.cards = $scope.cardsList[id];

			$scope.id = $scope.cards.id;
			
			$scope.terrace_img = $scope.cards.terrace_img
	    	$scope.board_img = $scope.cards.board_img;

	    	if ($scope.cards.boards.length > 1) 
	    	{
	    		$scope.btn_board_panel = true;
	    	}
	    	else
	    	{
	    		$scope.btn_board_panel = false;
	    	}

	    	$scope.cards.boards.forEach(function(item, i, arr) {
	    		if (i == 0)
	    		{
	    			$scope.name = $scope.cards.boards[i].name;
				  	$scope.brand = $scope.cards.boards[i].brand;
		    		$scope.height = $scope.cards.boards[i].height;
		    		$scope.width = $scope.cards.boards[i].width;
		    		$scope.thickness = $scope.cards.boards[i].thickness;
		    		$scope.type = $scope.cards.boards[i].type;
		    		$scope.price = $scope.cards.boards[i].price;
	    		}
    			
	    		if (i == 1)
	    		{
	    			$scope.parent.nameSecond = $scope.cards.boards[i].name;
			    	$scope.parent.brandSecond = $scope.cards.boards[i].brand;
			    	$scope.parent.heightSecond = $scope.cards.boards[i].height;
			    	$scope.parent.widthSecond = $scope.cards.boards[i].width;
			    	$scope.parent.thicknessSecond = $scope.cards.boards[i].thickness;
			    	$scope.parent.typeSecond = $scope.cards.boards[i].type;
			    	$scope.parent.priceSecond = $scope.cards.boards[i].price;
	    		}
			});
		}

		$scope.add = function (id) {
			$scope.id = id || false;
			console.log($scope.id);
			if ($scope.addBoard.$invalid)
			{
				return $scope.validation('Please enter fields');
			}

			if ($scope.addBoard.$valid)
			{

				var addBoards = {};
		    	addBoards.terrace_img = $scope.terrace_img;
		    	addBoards.board_img = $scope.board_img;

		    	addBoards.id =  $scope.id ? $scope.id : false;

		    	addBoards.name = $scope.name;
		    	addBoards.brand = $scope.brand;
		    	addBoards.height = $scope.height;
		    	addBoards.width = $scope.width;
		    	addBoards.thickness = $scope.thickness;
		    	addBoards.type = $scope.type;
		    	addBoards.price = $scope.price;

		    	if ($scope.btn_board_panel)
		    	{

			    	addBoards.nameSecond = $scope.parent.nameSecond;
			    	addBoards.brandSecond = $scope.parent.brandSecond;
			    	addBoards.heightSecond = $scope.parent.heightSecond;
			    	addBoards.widthSecond = $scope.parent.widthSecond;
			    	addBoards.thicknessSecond = $scope.parent.thicknessSecond;
			    	addBoards.typeSecond = $scope.parent.typeSecond;
			    	addBoards.priceSecond = $scope.parent.priceSecond;

		    		$scope.url = $scope.id ? '/api/admin/updateBoards' : '/api/admin/addBoards';
		    	}
		    	else
		    	{
		    		$scope.url = $scope.id ? '/api/admin/updateBoard' : '/api/admin/addBoard';
		    	}

		    	Upload.upload({
                    url: $scope.url,
                    data: addBoards
                }).then(function (response) {
                   	$scope.id ? $scope.checkBoard('You update board!') : $scope.checkBoard('You added board!');
                   	$timeout(function() {
						window.location.reload();
					}, 500);
                });
			}
		}

		$scope.remove = function (id) {
			$scope.id = id || false;
			console.log($scope.id);

			var addBoards = {};
			addBoards.id = $scope.id;

			Upload.upload({
                url: '/api/admin/remove',
                data: addBoards
            }).then(function (response) {
               	$scope.checkBoard('You remove board!')
                $timeout(function() {
					window.location.reload();
				}, 500);
            });
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

			$scope.namSeconde = '';
			$scope.brandSecond = '';
			$scope.heightSecond = '';
			$scope.widthSecond = '';
			$scope.thicknessSecond = '';
			$scope.typeSecond = '';
			$scope.priceSecond = '';
		}
	});

})()