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
		$scope.terrace = {'x': [15, 10], 'y': [1.6, 2]};
		$scope.margin = {'x': [0, 0], 'y': [0, 0]};
		$scope.layout = '1';

		$scope.t = false;
		$scope.b = [{}, {}];
		$scope.restsStack = [];
		$scope.startY = false;
		$scope.colsStart = 0;
		$scope.boardType = 0;
		$scope.twoBoards = false;
		$scope.boardsCount = [0, 0];
		$scope.circle = false;

		$scope.clearVars = function() {
			$scope.colsStart = 0;
			$scope.boardType = 0;
		};

		$scope.calculate = function() {
			$scope.restsStack = [];
			$scope.boardsCount = [0, 0];
			if($scope.layout == '0')
			{
				$scope.t = {'x': $scope.terrace.x[0] * 100, 'y': $scope.terrace.y[0] * 100};
			}
			else
			{
				$scope.t = {'x': $scope.terrace.y[0] * 100, 'y': $scope.terrace.x[0] * 100};
			}
			
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
					$scope.circle = ($scope.type == '2') && (i == 1) ? true : false;

					if($scope.layout == '0')
					{
						$scope.t = {'x': $scope.terrace.x[i] * 100, 'y': $scope.terrace.y[i] * 100};
					}
					else
					{
						$scope.t = {'x': $scope.terrace.y[i] * 100, 'y': $scope.terrace.x[i] * 100};
					}
					
					$scope.compute();						
				}
			}
		};

		$scope.deltaFromBegin = 0;
		$scope.pairCounter = 1;
		$scope.colsCount = function() {
			var cols =  Math.ceil($scope.t.x / $scope.b[$scope.boardType].x);
			if (cols % 2 > 0)
			{
				$scope.pairCounter = 0;
				$scope.deltaFromBegin = $scope.b[$scope.boardType].x / 2;
				cols--;

				print.row(cols / 2);
				$scope.fillCol(cols / 2);
			}
			return cols / 2;
		};
		
		$scope.compute = function()
		{
			$scope.clearVars();

			print.init($scope.t.x, $scope.t.y, $scope.b[0].x);

			var halfCols = $scope.colsCount();
			for (var i = (halfCols - 1); i >= 0; i--)
			{
				print.row(i);
				$scope.fillCol(i);
				print.row(2 * halfCols - i - $scope.pairCounter);
				$scope.fillCol(i);
			}
		};

		$scope.fillCol = function(colNumber) {
			$scope.boardType = 0;
			var start = $scope.boardY();
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

			var maxColY =  $scope.t.y;
			if ($scope.circle)
			{
				maxColY = $scope.getMaxcolY(colNumber);
			}

			var colY = $scope.nextBoard(start, maxColY);
			while (colY < maxColY)
			{
				colY += $scope.nextBoard($scope.boardY(), maxColY, colY);
			}
			$scope.addRest(colY - maxColY);
		};

		$scope.nextBoard = function(board, maxColY, colY) {
			colY = colY || 0;
			var left = (maxColY - colY);
			var part = left > board ? board : left;

			if ( ! $scope.checkInStack(part))
			{
				/*if ($scope.twoBoards)
				{
					$scope.boardType = $scope.betterBoard(part);
				}*/

				print.board(part, $scope.boardType);
				$scope.boardsCount[$scope.boardType]++;
				$scope.addRest($scope.boardY() - part);
			}

			if ($scope.twoBoards)
			{
				$scope.boardType = 1 - $scope.boardType;
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
						print.board(part, 2);
						$scope.restsStack[k] -= part;
						return true;
					}
				}
			}

			return false;
		};

		$scope.boardY = function() {
			var y = $scope.b[$scope.boardType].y;
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

		$scope.getMaxcolY = function(colNumber) {
			var r = $scope.getRadius();
			var partR = $scope.t.x / 2;
			var xFromBegin = (colNumber + 1) * $scope.b[$scope.boardType].x + $scope.deltaFromBegin;
			if (xFromBegin > partR)
			{
				xFromBegin -= colNumber;
			}
			var cathetusX = Math.abs(partR - xFromBegin);
			var cathetusY = Math.sqrt( r * r - cathetusX * cathetusX);
			var delta = r - cathetusY;
			return $scope.t.y - delta;
		};

		$scope.getRadius = function() {
			return ($scope.t.y * $scope.t.y  + $scope.t.x * $scope.t.x / 4 ) / 2 / $scope.t.y;
		};

	});
})();

;