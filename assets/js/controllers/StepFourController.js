(function() {
	angular.module("app").controller("StepFourController", function($rootScope, $scope, $location, $routeParams, print,  request, connect) {
		$scope.tab = 0;
	    $scope.setTab = function(newTab) {
	       $scope.tab = newTab;
	    };

	    $scope.isSet = function(tabNum) {
	       return $scope.tab === tabNum;
	    };

	    $scope.getTerr = function(obj, c, d) {
	    	for (var i in $scope.boardsCount)
	    	{
	    		var priceElementQuantity1 = Math.ceil((obj.paramFirstBoardY / 500 ) * $scope.boardsCount[i][0]);
	    		var priceElementQuantity2 = 0;

		    	if (obj.paramSecondBoardY)
		    	{
		    		var priceElementQuantity2 = Math.ceil((obj.paramSecondBoardY / 500 ) * $scope.boardsCount[i][1]);
		    	}

	    		for (var k in $scope.boardsCount[i])
	    		{
					var priceSecondBoard = obj.priceSecondBoard || 0;
					var a = $scope.boardsCount[i][0] * obj.priceFirstBoard;
					var b = obj.elementPrice * (priceElementQuantity1 + priceElementQuantity2).toFixed(2); 
					var e = $scope.boardsCount[i][1] * priceSecondBoard;
					$scope.element[i] = Math.ceil((priceElementQuantity1 + priceElementQuantity2));
		    		$scope.total[i] = ((a + b + c + d + e).toFixed(2));
	    		}
	    	}
	    };
    	

	    $scope.totalSum = function(obj) {
	    	$scope.total = [];
	    	$scope.element = [];
	    	$scope.zacisk = [];
	    	$scope.legars = [];
	    	var h, h1, c, d, allHH, allHV, allLegarH, allLegarV;
	    	var h2 = 0;

	    	$scope.side.forEach( function(item, m, arr) {
			  	if (item == 0)
			  	{
			  		allHH = 0;
			  		allLegarH = 0;
			  		$scope.terrace.y.forEach(function(l, j) {
					  	h1 = (($scope.terrace.y[j] * 1000) / obj.paramFirstBoardY) * (obj.paramFirstBoardY / 500) * 2;

					  	allLegarH1 =  Math.ceil((($scope.terrace.y[j] * 1000) / 500) * (($scope.terrace.x[j] * 1000) / 2400));
					  	
				  		if (obj.paramSecondBoardY)
				    	{
				    		h2 = (($scope.terrace.y[j] * 1000) / obj.paramSecondBoardY) * (obj.paramSecondBoardY / 500) * 2;
				    	}

				    	h = h1 + h2;
				    	allHH =  Math.ceil(allHH + h);
				    	allLegarH = allLegarH + allLegarH1;
				    	console.log(allLegarH1)
					});
					
					c = obj.zaciskPrice * allHH;
					d = obj.legarPrice * allLegarH;
					$scope.legars.push(allLegarH);
			  		$scope.zacisk.push(allHH);
			  		$scope.getTerr(obj, c, d);
			  	}
			  	else
			  	{
			  		allHV = 0;
			  		allLegarV = 0;
			  		$scope.terrace.x.forEach(function(l, j) {
					  	h1 = (($scope.terrace.x[j] * 1000) / obj.paramFirstBoardY) * (obj.paramFirstBoardY / 500) * 2;

					  	allLegarV1 = Math.ceil((($scope.terrace.x[j] * 1000) / 500) * (($scope.terrace.y[j] * 1000) / 2400));

				  		if (obj.paramSecondBoardY)
				    	{
				    		h2 = (($scope.terrace.x[j] * 1000) / obj.paramSecondBoardY) * (obj.paramSecondBoardY / 500) * 2;
				    	}

				    	h = h1 + h2;
				    	allHV =  Math.ceil(allHV + h);
				    	allLegarV = allLegarV + allLegarV1;
					});
					c = obj.zaciskPrice * allHV;
					d = obj.legarPrice * allLegarV;
					$scope.legars.push(allLegarV);
					$scope.zacisk.push(allHV);
					$scope.getTerr(obj, c, d);
			  	}
			});
		};

		$scope.getCards = function() {
			if ( ! $scope.cards)
			{
				request.send('/backEnd/boards.json', {}, function(data) {
					$scope.cards  = data.data;
					$scope.getParamBoards();
					$scope.totalSum($scope.cardInfo);
				});
			}
			else
			{
				$scope.getParamBoards();
				$scope.totalSum($scope.cardInfo);
			}
		};

		$scope.initData = function() {
			$scope.const = $routeParams.params * 1;

			if (! $scope.const)
			{
				$scope.getParamBoards();
				$scope.totalSum($scope.cardInfo);
			}
			else
			{
				$scope.getCards();
			}
		};

		$scope.initData();
	});
})()
;