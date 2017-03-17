(function(){
	angular.module("app", []);
})()

;

(function(){
	angular.module("app")
		.directive("ftoggle", function(){
			var directive = {};
			directive.restrict = "A";
			directive.controller = "AppCtrl";
			directive.link = function(scope, element, attrs)
			{
				element.on("click", function(){
					angular.element('.figure').attr('style', '');
					angular.element('.up-rectangle').attr('style', '');
					angular.element('.down-rectangle').attr('style', '');
					angular.element('.rectangle').attr('style', '');
					angular.element('.circle').attr('style', '');
				
					element.parent().parent().find(".thumbnail").removeClass("active");
					element.addClass("active");
					console.log(scope.input);
				});
			}
			
			return directive;
		});
})()

;

(function(){
	angular.module("app")
		.directive("ffocus", function(){
			var directive = {};
			directive.restrict = "A";
			directive.controller = "AppCtrl";
			directive.link = function(scope, element, attrs)
			{
				var elm = element.data("ffocus-elm"),
					side = "border";
				if (element.data("ffocus-side"))
				{
					side += '-' + element.data("ffocus-side");					
				}
				
				
				element.on("focus", function(){
					angular.element('.figure').attr('style', '');
					angular.element('.up-rectangle').attr('style', '');
					angular.element('.down-rectangle').attr('style', '');
					angular.element('.rectangle').attr('style', '');
					angular.element('.circle').attr('style', ''); 
				
					angular.element(elm).attr('style', side + '-color : #ee6e73;' + side + '-width: 2px');
				});
				
			}
			
			return directive;
		});
})()

;

(function(){
	angular.module("app")
		.controller("AppCtrl", function($scope){
			
		});
})();

;

(function(){
	angular.module("app")
		.controller("OneBoardCtrl", function($scope, $location){
			
			$scope.input = {};
			$scope.m0 = [];
			$scope.m1 = [];
			$scope.m2 = [];
			
			$scope.length = [];
			$scope.col = [];
			
			$scope.board_count = 0;
			$scope.result = {};
			
			$scope.calculate = function()
			{
				var terrace = {},
					result = 0;
				terrace = {
						"length" : $scope.input.terrace.length[0].value * 100,
						"width" : $scope.input.terrace.width[0].value * 100
					};
				
				board = {
							"length" : $scope.input.board.length * 1,
							//"width" : ($scope.input.board.width * 1) + $scope.input.board.seam * 1
							"width" : ($scope.input.board.width * 1)
						};
				
				if($scope.input.terrace.type == 0)
				{
					console.log('type 1');
					result = $scope.compute(terrace, board);
				}
				else if($scope.input.terrace.type == 1)
				{
					console.log('type 2');
					
					for(var i = 0; i <= 1; i++)
					{
						terrace = {
							"length" : $scope.input.terrace.length[i].value * 100,
							"width" : $scope.input.terrace.width[i].value * 100
						};
						
						result += $scope.compute(terrace, board);						
					}
				}
				else if($scope.input.terrace.type == 2)
				{
					console.log('type 3');
					terrace = {
						"length" : $scope.input.terrace.length[0].value * 100,
						"width" : $scope.input.terrace.width[0].value * 100
					};
						
					result += $scope.compute(terrace, board);
					
					terrace = {
						"length" : $scope.input.terrace.radius.value * 100,
						"width" :$scope.input.terrace.radius.value * 100
					};
						
					result += $scope.compute(terrace, board);						
					
				}
				
				$scope.result.value = result;
			}
			
			$scope.compute = function(terrace, board)
			{
				$scope.clear();
				if ($scope.input.laying == "evenly")
				{
					// Равномерно
					var i = 0,
						col = [],
						tmp = [],
						rem = 0,
						row = 0;
						
					
					
					var boardCountsWithoutBorders = Math.ceil(terrace.width * 1 / board.width); 
					var boardsSumWidth = (boardCountsWithoutBorders * $scope.input.board.seam) - $scope.input.board.seam;
					var realBoardCountsWithBorders = Math.ceil(((terrace.width * 1) - boardsSumWidth) / board.width);
					var fullBoards = Math.floor((terrace.width * 1) / (board.length * 1)) * realBoardCountsWithBorders;
					var rest = (terrace.length * 1) % (board.length * 1);
					var obrizok = board.length - rest;
					
					if (rest == 0)
					{
						rest = terrace.length * 1;
					}
					
					var fullRows = Math.floor(board.length * 1/ rest);
					var boardsResult = fullBoards * 1 + Math.ceil(realBoardCountsWithBorders / fullRows);
					
					
					console.log('boardCountsWithoutBorders: ', boardCountsWithoutBorders);
					console.log('boardsSumWidth: ', boardsSumWidth);
					console.log('realBoardCountsWithBorders: ', realBoardCountsWithBorders);
					console.log('boardsResult: ', boardsResult);
					console.log('terrace: ', terrace);
					console.log('board: ', board);
					console.log('fullRows: ', fullRows);
					console.log('fullBoards: ', fullBoards);
					
					while (true)
					{	
						if ($scope.count(tmp) >= terrace.length * 1)
						{
							rem = $scope.count(tmp) - terrace.length * 1;
							tmp = tmp.slice(0, -1);
							$scope.board_count --;
							if ($scope.search_reminder(board.length * 1 - rem))
							{
								tmp.push(board.length * 1 - rem);
								col.push(tmp);
							}
							else
							{
								$scope.m1.push(rem);
								tmp.push(board.length * 1 - rem);
								$scope.board_count ++;
								
							}
							
							col.push(tmp);
							tmp = [];
							row ++;
						}
						else
						{
							tmp.push(board.length * 1);
							$scope.board_count ++;
						}

						if (row * (board.width * 1) >= terrace.width * 1)
						{
							//console.log(terrace.width);
							//console.log((row * board.width * 1));
							//console.log(col);
							break;
						}
					}
					
					//console.log($scope.board_count);
					
					return $scope.board_count;
				}
				else
				{
					// Попеременно
					$scope.split();
					
					var col = [],
						tmp = [],
						row = 0;
					
					tmp.push($scope.input.board.length * 1);
					while (true)
					{
						if (row * (board.width * 1) >= terrace.width * 1)
						{
							break;
						}
						
						if ($scope.count(tmp) >= terrace.length * 1)
						{
							rem = $scope.count(tmp) - terrace.length * 1;
							tmp = tmp.slice(0, -1);
							$scope.board_count --;
							if ($scope.search_reminder(board.length * 1 - rem))
							{
								tmp.push(board.length * 1 - rem);
								col.push(tmp);
							}
							else
							{
								$scope.m1.push(rem);
								tmp.push(board.length * 1 - rem);
								$scope.board_count ++;
							}
							
							col.push(tmp);
							tmp = [];
							row ++;
						}
						else
						{
							if (tmp[tmp.length - 1] == $scope.input.board.length * 1)
							{
								if ($scope.m2.length)
								{
									tmp.push($scope.m2.pop());
									$scope.m2.length --;
								}
								else
								{
									$scope.split();
								}
							}
							else 
							{
								tmp.push($scope.input.board.length * 1);
								$scope.board_count ++;
							}
						}
						
					}
					
					console.log("m1: ", $scope.m1);
					console.log("m2: ", $scope.m2);
					console.log("boards: ", col);
					
					return  Math.floor($scope.board_count, 1);
				
				}
					
					
			}
			
			$scope.search_reminder = function(desired)
			{
				
				var reminder;
				for(var i in $scope.m1)
				{
					if (desired * 1 == $scope.m1[i] * 1)
					{
						delete $scope.m1[i];
						return true;
					}
					else if (desired * 1 < $scope.m1[i] * 1)
					{
						var reminder = $scope.m1[i] * 1 - desired * 1;
						delete $scope.m1[i];
						$scope.m1.push(reminder);
						console.log('ріжемо останки');
						console.log($scope.m1);
						return true;
					}
				}
				
				return false;
			}
			
			$scope.split = function()
			{
				var i = 0;
				while (i < Math.round($scope.input.board.length / $scope.input.board.split))
				{
					i ++;
					$scope.m2.push($scope.input.board.split * 1);
				}
				
				$scope.m0.push($scope.input.board.length - $scope.count($scope.m2));
				$scope.board_count ++;
			}
			
			$scope.clear = function()
			{
				$scope.length = [];
				$scope.m0 = [];
				$scope.m1 = [];
				$scope.m2 = [];
				$scope.board_count = 0;
				$scope.result.value = 0;
			}
			
			$scope.remove = function(array, value)
			{
				var tmp_array = [];
				for(var i in array)
				{
					if (array[i] != value)
					{
						tmp_array.push(array[i]);
					}						
				}
				return tmp_array;
			}
			
			$scope.count = function(list)
			{
				var result = 0;
				for(var item in list)
				{
					result += list[item];
				}
				return result;
			}
			
			$scope.set_test_data = function()
			{
				$scope.input.laying = "evenly";
				$scope.input.board = {};
				$scope.input.board.length = '160.00';
				$scope.input.board.width = '15.00';
				$scope.input.board.seam = '0';
				$scope.input.board.split = '80.00';
				$scope.input.terrace = {};
				$scope.input.terrace.type = 0;
				
				$scope.input.terrace.length = {};
				$scope.input.terrace.length[0] = {};
				$scope.input.terrace.length[0].value = '5.0';
				$scope.input.terrace.length[0].margin = '0';
				
				$scope.input.terrace.width = {};
				$scope.input.terrace.width[0] = {};
				$scope.input.terrace.width[0].value = '15';
				$scope.input.terrace.width[0].margin = '0';
				
				// where terrace.type == 1
				$scope.input.terrace.length[1] = {};
				$scope.input.terrace.length[1].value = '0.5';
				$scope.input.terrace.length[1].margin = '0';
				
				$scope.input.terrace.width[1] = {};
				$scope.input.terrace.width[1].value = '10';
				$scope.input.terrace.width[1].margin = '0';
				
				// where terrace.type == 2
				$scope.input.terrace.radius = {};
				$scope.input.terrace.radius.value = '2.00';
				$scope.input.terrace.radius.margin = '0';
			}
			
			$scope.set_test_data();
			
		});
})()

;

(function(){
	angular.module("app")
		.controller("TwoBoardCtrl", function($scope){
			
			$scope.input = {};
			$scope.m0 = [];
			$scope.m1 = [];
			$scope.m2 = [];
			
			$scope.length = [];
			$scope.col = [];
			
			$scope.board_count = 0;
			$scope.result = {};
			
			$scope.calculate = function()
			{
				var terrace = {},
					result = 0;
				terrace = {
						"length" : $scope.input.terrace.length[0].value * 100,
						"width" : $scope.input.terrace.width[0].value * 100
					};
				
				board = {
							"board_one" : {
											"length" : $scope.input.board.board_length_one.length * 1
										},
							"board_two" : {
											"length" : $scope.input.board.board_length_two.length * 1
										},
							"width" : $scope.input.board.width * 1
					};

				

				if($scope.input.terrace.type == 0)
				{
					console.log('type 1');
					result = $scope.compute(terrace, board);
				}
				else if($scope.input.terrace.type == 1)
				{
					console.log('type 2');
					
					for(var i = 0; i <= 1; i++)
					{
						terrace = {
							"length" : $scope.input.terrace.length[i].value * 100,
							"width" : $scope.input.terrace.width[i].value * 100
						};
						
						result += $scope.compute(terrace, board);						
					}
				}
				else if($scope.input.terrace.type == 2)
				{
					console.log('type 3');
					terrace = {
						"length" : $scope.input.terrace.length[0].value * 100,
						"width" : $scope.input.terrace.width[0].value * 100
					};
						
					result += $scope.compute(terrace, board);
					
					terrace = {
						"length" : $scope.input.terrace.radius.value * 100,
						"width" :$scope.input.terrace.radius.value * 100
					};
						
					result += $scope.compute(terrace, board);						
					
				}
				
				$scope.result.value = result;
			}
			
			$scope.compute = function(terrace, board)
			{
				$scope.clear();

				var col = [],
					tmp = [],
					row = 0,
					i = 0;
				
				tmp.push(board.board_two.length * 1);
				while (true)
				{
					if (row * (board.width * 1) >= terrace.width * 1)
					{
						break;
					}
					
					if ($scope.count(tmp) >= terrace.length * 1)
					{
						rem = $scope.count(tmp) - terrace.length * 1;
						art = tmp.pop();
						$scope.board_count --;
						
						if ($scope.search_reminder(art - rem))
						{
							tmp.push(art - rem);
						}
						else
						{
							$scope.m1.push(art - (art - rem));
							tmp.push(art - rem);
							$scope.board_count ++;
						}
						
						
						col.push(tmp);
						tmp = [];
						row ++;
					}
					else
					{
						if (i % 2)
						{
							tmp.push(board.board_two.length * 1);
						}
						else 
						{
							tmp.push(board.board_one.length * 1);
						}
						i ++;
						$scope.board_count ++;
					}
				}
				
				console.log("m1: ", $scope.m1);
				console.log("boards: ", col);
				
				return  Math.floor($scope.board_count, 1);
					
			}
			
			$scope.search_reminder = function(desired)
			{
				
				var reminder;
				for(var i in $scope.m1)
				{
					if (desired * 1 == $scope.m1[i] * 1)
					{
						delete $scope.m1[i];
						return true;
					}
					else if (desired * 1 < $scope.m1[i] * 1)
					{
						var reminder = $scope.m1[i] * 1 - desired * 1;
						delete $scope.m1[i];
						$scope.m1.push(reminder);
						return true;
					}
				}
				
				return false;
			}
			
			$scope.clear = function()
			{
				$scope.length = [];
				$scope.m0 = [];
				$scope.m1 = [];
				$scope.m2 = [];
				$scope.board_count = 0;
				$scope.result.value = 0;
			}
			
			$scope.count = function(list)
			{
				var result = 0;
				for(var item in list)
				{
					result += list[item];
				}
				return result;
			}
			
			$scope.set_test_data = function()
			{ 
				$scope.input.board = {};
				
				$scope.input.board.board_length_one = {};
				$scope.input.board.board_length_one.length = '200.00';
				$scope.input.board.board_length_one.margin = '25.00';
				
				$scope.input.board.board_length_two = {};
				$scope.input.board.board_length_two.length = '100.00';
				$scope.input.board.board_length_two.margin = '25.00';
				
				$scope.input.board.width = '14.00';
				$scope.input.board.seam = '1.00';

				$scope.input.terrace = {};
				$scope.input.terrace.type = 0;
				
				$scope.input.terrace.length = {};
				$scope.input.terrace.length[0] = {};
				$scope.input.terrace.length[0].value = '5.0';
				$scope.input.terrace.length[0].margin = '0';
				
				$scope.input.terrace.width = {};
				$scope.input.terrace.width[0] = {};
				$scope.input.terrace.width[0].value = '15';
				$scope.input.terrace.width[0].margin = '0';
				
				// where terrace.type == 1
				$scope.input.terrace.length[1] = {};
				$scope.input.terrace.length[1].value = '0.5';
				$scope.input.terrace.length[1].margin = '0';
				
				$scope.input.terrace.width[1] = {};
				$scope.input.terrace.width[1].value = '10';
				$scope.input.terrace.width[1].margin = '0';
				
				// where terrace.type == 2
				$scope.input.terrace.radius = {};
				$scope.input.terrace.radius.value = '2.00';
				$scope.input.terrace.radius.margin = '0';

			}
			
			$scope.set_test_data();
		});
})()

;