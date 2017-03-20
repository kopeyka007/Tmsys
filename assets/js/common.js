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
		.controller("OneBoardCtrl", function($scope, $location) {
			
			$scope.input = {};
			$scope.m0 = [];
			$scope.m1 = [];
			$scope.m2 = [];
			
			$scope.length = [];
			$scope.col = [];
			
			$scope.board_count = 0;
			$scope.result = {};

			/*$scope.init = function() {
				$scope.input.terrace = {x: [{value: 15}, {value: 10}], y: [{value: 1.6}, {value: 0.5}]};
				$scope.input.board = {x: 14, y: 160, seam: 1};
			};
			$scope.init();*/
			
			$scope.calculate = function() {
				console.log($scope.input.terrace);
				var result = 0;
				var terrace = {"y" : $scope.input.terrace.y[0].value * 100,
						   	   "x" : $scope.input.terrace.x[0].value * 100};
				
				var board = {"y" : $scope.input.board.y * 1,
							 "x" : $scope.input.board.x * 1 + $scope.input.board.seam * 1};

				if ($scope.input.terrace.type == 0)
				{
					console.log('Terrace type 1');
					result = $scope.compute(terrace, board);
				}
				else if($scope.input.terrace.type == 1)
				{
					console.log('Terrace type 2');
					
					for(var i = 0; i <= 1; i++)
					{
						terrace = {
							"y" : $scope.input.terrace.y[i].value * 100,
							"x" : $scope.input.terrace.x[i].value * 100
						};
						
						result += $scope.compute(terrace, board);						
					}
				}
				else if($scope.input.terrace.type == 2)
				{
					console.log('Terrace type 3');
					terrace = {
						"y" : $scope.input.terrace.y[0].value * 100,
						"x" : $scope.input.terrace.x[0].value * 100
					};
						
					result += $scope.compute(terrace, board);
					
					terrace = {
						"y" : $scope.input.terrace.radius.value * 100,
						"x" :$scope.input.terrace.radius.value * 100
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
					//Равномерно
					var cols = Math.ceil(terrace.x / board.x);
					console.log('Cols: ', cols);

					var full_boards = Math.floor(terrace.y / board.y) * cols;
					console.log('Full Boards: ', full_boards);
					
					var rest = ((terrace.y % board.y) == 0 && (terrace.y < board.y)) ? terrace.y : (terrace.y % board.y);
					console.log('Rest: ', rest);

					var rests_in_board = rest > 0 ? Math.floor(board.y * 1/ rest) : 0;
					console.log('Rests in Board: ', rests_in_board);

					var result = full_boards + (rests_in_board > 0 ? Math.ceil(cols / rests_in_board) : 0);
					console.log('Result: ', result);

					return result;
				}
				else
				{
					// Попеременно
					var cols = Math.ceil(terrace.x / board.x);
					var rests = [];
					var second_coll = false;
					var m1 = [];

					var second_height = $scope.input.board.split * 1; 
					var result = 0;
					//Set row one by one
					while (cols) {
						//Current board
						var coll_height = 0;
						var boards_on_coll = 0;
						
						//Set boards to the coll
						while (coll_height < terrace.y) {
							//Calculate current needed lenth of board (first/second coll)
							var height_need = (second_coll && coll_height == 0 ? second_height : board.y);
							
							//calculate length of last board on the coll
							if (height_need + coll_height > terrace.y) {
								height_need = terrace.y - coll_height;
							}
							
							// Get needed board not foundeded in storage 
							if (!$scope.search_reminder(height_need)) {
								//If board not founded on storage: 
								if (board.y > height_need) {
									//Add part of board after second row
									$scope.m1.push(board.y - height_need);
								}
								boards_on_coll++;
							}

							// On last board must go out from coll while
							coll_height += height_need;
						}
						//Add boards to row on global counter
						result += boards_on_coll;
						//Change rows first/second
						second_coll = !second_coll;
						//Set rows 
						cols--;
					}

					return result;
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