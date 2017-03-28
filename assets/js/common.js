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

(function() {
	angular.module("app").controller("AppCtrl", function($scope, print) {
		$scope.laying = 'evenly';
		$scope.board = {'x': 14, 'y': [160, 90]};
		$scope.seam = 1;
		$scope.split = 80;

		$scope.type = '0';
		$scope.terrace = {'x': [15, 10], 'y': [1.6, 0.5]};
		$scope.margin = {'x': [0, 0], 'y': [0, 0]};

		$scope.t = false;
		$scope.b = [{}, {}];
		$scope.restsStack = [];
		$scope.startY = false;
		$scope.colsStart = 0;
		$scope.boardType = 0;
		$scope.twoBoards = false;
		$scope.boardsCount = [0, 0];

		$scope.clearVars = function() {
			$scope.colsStart = 0;
			$scope.boardType = 0;
		};

		$scope.calculate = function() {
			$scope.restsStack = [];
			$scope.boardsCount = [0, 0];

			$scope.t = {'x': $scope.terrace.x[0] * 100, 'y': $scope.terrace.y[0] * 100};
			$scope.b[0] = {'x': ($scope.board.x * 1 + $scope.seam * 1), 'y': $scope.board.y[0] * 1};
			$scope.b[1] = {'x': ($scope.board.x * 1 + $scope.seam * 1), 'y': $scope.board.y[1] * 1};
			$scope.startY = ($scope.twoBoards ? $scope.b[1].y : $scope.split) * 1;

			if ($scope.type == '0')
			{
				console.log('Terrace type 1');
				$scope.compute();
			}
			else if($scope.type == '1' || $scope.type == '2')
			{
				console.log('Terrace type ' + $scope.type);
				for(var i = 0; i <= 1; i++)
				{
					$scope.t = {'x': $scope.terrace.x[i] * 100, 'y': $scope.terrace.y[i] * 100};
					$scope.compute();						
				}
			}
		};

		$scope.colsCount = function() {
			return Math.ceil($scope.t.x / $scope.b[$scope.boardType].x);
		};
		
		$scope.compute = function()
		{
			$scope.clearVars();

			print.init($scope.t.x, $scope.t.y, $scope.b[0].x);

			var cols = $scope.colsCount();
			for (var i = 0; i < cols; i++)
			{
				print.row(i);
				$scope.fillCol();
			}
		};

		$scope.fillCol = function() {
			var start = $scope.boardY();
			$scope.boardType = 0;
			if ($scope.laying == 'emporally' || $scope.twoBoards)
			{
				$scope.colsStart = 1 - $scope.colsStart;
				if ($scope.colsStart == 0)
				{
					start = $scope.startY;
					if ($scope.twoBoards)
					{
						$scope.boardType = 1;
					}
				}
			}

			var colY = $scope.nextBoard(start);
			while (colY < $scope.t.y)
			{
				colY += $scope.nextBoard($scope.boardY(), colY);
			}
			$scope.addRest(colY - $scope.t.y);
		};

		$scope.nextBoard = function(board, colY) {
			colY = colY || 0;
			var left = ($scope.t.y - colY);
			var part = left > board ? board : left;

			if ( ! $scope.checkInStack(part))
			{
				if ($scope.twoBoards)
				{
					$scope.boardType = $scope.betterBoard(part);
				}

				print.board(part);
				$scope.boardsCount[$scope.boardType]++;
				$scope.addRest($scope.boardY() - part);
			}

			return part;
		};

		$scope.betterBoard = function(part) {
			var delta = [0, 0];
			delta[0] = $scope.b[0].y - part;
			delta[1] = $scope.b[1].y - part;

			if (delta[0] >= 0 && delta[1] >= 0)
			{
				if (delta[0] > delta[1])
				{
					return 1;
				}
				else if (delta[0] < delta[1])
				{
					return 0;
				}
				else
				{
					return ($scope.b[0].y <= $scope.b[1].y ? 0 : 1);
				}
			}
			else
			{
				if (delta[0] < 0)
				{
					return 1;
				}

				if (delta[1] < 0)
				{
					return 0;
				}
			}

			return $scope.boardType;
		};

		$scope.checkInStack = function(part) {
			$scope.restsStack.sort(function(a, b) { return a > b ? 1 : (a < b ? -1 : 0); });
			for (var k in $scope.restsStack)
			{
				if ($scope.restsStack[k] > 0)
				{
					if ($scope.restsStack[k] >= part)
					{
						print.board(part, true);
						$scope.restsStack[k] -= part;
						return true;
					}
				}
			}

			return false;
		};

		$scope.boardY = function() {
			var y = $scope.b[$scope.boardType].y;
			if ($scope.twoBoards)
			{
				$scope.boardType = 1 - $scope.boardType;
			}
			return y;
		};

		$scope.addRest = function(part) {
			$scope.restsStack.push(part);

			var newStack = [];
			for (var k in $scope.restsStack)
			{
				if ($scope.restsStack[k] > 0)
				{
					newStack.push($scope.restsStack[k]);
				}
			}
			$scope.restsStack = newStack;
		};
	});
})();

;