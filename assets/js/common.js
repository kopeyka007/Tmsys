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
		$scope.startWidth = $scope.board.y[0];
		$scope.type = '0';
		$scope.terrace = {'x': [4, 2], 'y': [1, 1] , 'z':[2, 2]};
		$scope.margin = {'x': [0, 0], 'y': [0, 0], 'z':[0, 0]};
		$scope.layout = '0';
		$scope.angle = '0';
		$scope.unitStart = true;
		$scope.blurBlock = false;


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
			$scope.deltaFromBegin = 0;
			$scope.mirrorStart = 1;
		};

		$scope.calculate = function() {
			$scope.restsStack = [];
			$scope.boardsCount = [0, 0];
			
			$scope.b[0] = {'x': ($scope.board.x * 1 + $scope.seam * 1), 'y': $scope.board.y[0] * 1};
			$scope.b[1] = {'x': ($scope.board.x * 1 + $scope.seam * 1), 'y': $scope.board.y[1] * 1};
			$scope.startY = ($scope.twoBoards ? $scope.b[1].y : $scope.split) * 1;

			print.reset();


			if ($scope.type == '0')
			{
				$scope.computeType0();
				console.log($scope.b)
			}
			else if($scope.type == '1')
			{
				$scope.computeType1();
			}
			else if ($scope.type == '2')
			{
				$scope.computeType2();
			}
			else if ($scope.type == '3')
			{
				$scope.computeType3();
			}

			print.render();

		};

		$scope.computeType0 = function() {
			$scope.t = $scope.getT(0);
			$scope.rectangle();
		};

		$scope.computeType1 = function() {
			for (var i = 0; i <= 1; i++)
			{
				$scope.t = $scope.getT(i);
				$scope.rectangle();
			}
		};

		$scope.computeType2 = function() {
			$scope.t = $scope.getT(0);
			$scope.rectangle();

			$scope.t = $scope.getT(1);
			$scope.circle();
		};

		$scope.computeType3 = function() {
			for (var i = 0; i <= 1; i++)
			{
				if ($scope.layout == 0)
				{
					$scope.t = {'x': $scope.terrace.x[i] * 100, 'y': $scope.terrace.y[i] * 100, 'z': $scope.terrace.z[i] * 100};
					print.init($scope.t.x, $scope.t.y, $scope.type, $scope.angle, i, $scope.startWidth);
					$scope.trapeze();
				}
				else
				{
					$scope.t = {'x': $scope.terrace.z[i] * 100, 'y': $scope.terrace.y[i] * 100};
					print.init($scope.t.x, $scope.t.y, $scope.type, $scope.angle, i, $scope.startWidth);
					$scope.rectangle();

					$scope.t = {'x': $scope.terrace.x[i] * 100, 'y': ($scope.terrace.y[i] - $scope.terrace.z[i]) * 100};
					print.init($scope.t.x, $scope.t.y, $scope.type, $scope.angle, i, $scope.startWidth);
					$scope.triangle();
				}	 
			}
		};

		$scope.trapeze = function() {
			$scope.clearVars();

			var cols = $scope.colsCount();
			for (var i = 0; i < cols; i++)
			{
				$scope.maxColY = $scope.getMaxTrapezeColY(i);
				$scope.printStep(i);
				$scope.fillCol();
			}	
		};

		$scope.getT = function(i) {
			var t = {};
			if ($scope.layout == '0')
			{
				t = {'x': $scope.terrace.x[i] * 100, 'y': $scope.terrace.y[i] * 100};
				print.init(t.x, t.y, $scope.type, $scope.angle, i, $scope.startWidth);
			}
			else
			{
				t = {'x': $scope.terrace.y[i] * 100, 'y': $scope.terrace.x[i] * 100};
				print.init(t.y, t.x, $scope.type, $scope.angle, i, $scope.startWidth);
			}
			return t;
		};

		$scope.rectangle = function() {
			$scope.clearVars();

			$scope.maxColY =  $scope.t.y;
			var cols = $scope.colsCount();
			for (var i = 0; i < cols; i++)
			{
				$scope.printStep(i);
				$scope.fillCol();
			}	
		};

		$scope.circle = function() {
			$scope.clearVars();
			var cols = $scope.colsCount();
			if ($scope.layout == 0)
			{
				cols = $scope.middleCol(cols);
				for (var i = (cols / 2) - 1; i >= 0; i--)
				{
					$scope.maxColY = $scope.getMaxCircleColY(i);
					$scope.printStep(i);
					$scope.fillCol();

					$scope.printStep(cols - i - $scope.mirrorStart);
					$scope.fillCol();
				}	
			}
			else
			{	
				for (var i = 0; i < cols; i++)
				{
					$scope.maxColY = $scope.getMaxCircleHorizontal(i);
					$scope.printStep(i, $scope.maxColY);
					$scope.fillCol();
				}	
			}
			
		};

		$scope.deltaFromBegin = 0;
		$scope.mirrorStart = 1;
		$scope.paired = function(cols) {
			return (cols % 2 == 0);
		};

		$scope.middleCol = function(cols) {
			var pair = $scope.paired(cols);
			if ( ! pair)
			{
				$scope.mirrorStart = 0;
				$scope.deltaFromBegin = $scope.b[$scope.boardType].x / 2;

				cols--;
				$scope.maxColY =  $scope.t.y;
				$scope.printStep(cols / 2);
				$scope.fillCol();
			}
			return cols;
		};

		$scope.triangle = function() {
			$scope.clearVars();

			var cols = $scope.colsCount();
			
			for (var i = 0; i < cols; i++)
			{
				$scope.maxColY = $scope.getMaxTriangleColY(i);
				$scope.printStep(i);
				$scope.fillCol();
			}	
		};

		$scope.colsCount = function() {
			return Math.ceil($scope.t.x / $scope.b[$scope.boardType].x);
		};

		$scope.fillCol = function() {
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

			var colY = $scope.nextBoard(start);
			while (colY < $scope.maxColY)
			{
				colY += $scope.nextBoard($scope.boardY(), colY);
			}
			$scope.addRest(colY - $scope.maxColY);
		};

		$scope.nextBoard = function(board, colY) {
			colY = colY || 0;
			var left = ($scope.maxColY - colY);
			var part = left > board ? board : left;

			if ( ! $scope.checkInStack(part))
			{
				$scope.printBoard(part, $scope.boardType);
				$scope.boardsCount[$scope.boardType]++;
				$scope.addRest($scope.boardY() - part);
			}

			if ($scope.twoBoards)
			{
				$scope.boardType = 1 - $scope.boardType;
			}

			return part;
		};

		$scope.boardY = function() {
			var y = $scope.b[$scope.boardType].y;
			return y;
		};

		$scope.checkInStack = function(part) {
			$scope.restsStack.sort(function(a, b) { return a > b ? 1 : (a < b ? -1 : 0); });
			for (var k in $scope.restsStack)
			{
				if ($scope.restsStack[k] > 0)
				{
					if ($scope.restsStack[k] >= part)
					{
						$scope.printBoard(part, 2);
						$scope.restsStack[k] -= part;
						return true;
					}
				}
			}

			return false;
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

		$scope.getMaxCircleColY = function(colNumber) {
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

		$scope.getMaxCircleHorizontal = function(colNumber) {
			var r = $scope.getRadius(true);
			var x1 = $scope.t.x - (colNumber * $scope.b[$scope.boardType].x);
			return Math.ceil(Math.sqrt( (8 * x1 * r) - (4 * x1 * x1)));
		};

		$scope.getMaxTrapezeColY = function(colNumber) {
			var a = $scope.t.y - $scope.t.z;
			var ctgA = a / $scope.t.x;
			var c = $scope.t.x - (colNumber + 1) * $scope.b[$scope.boardType].x;
			return Math.ceil($scope.t.y - c * ctgA);
		};

		$scope.getMaxTriangleColY = function(colNumber) {
			var b = (colNumber + 1) * $scope.b[$scope.boardType].x;
			return   Math.ceil(($scope.t.y / $scope.t.x) * b);
		};

		$scope.getRadius = function(hor) {
			hor = hor || false;
			if( ! hor)
			{
				return ($scope.t.y * $scope.t.y  + $scope.t.x * $scope.t.x / 4 ) / 2 / $scope.t.y;
			}
			else
			{
				return ($scope.t.x * $scope.t.x  + $scope.t.y * $scope.t.y / 4 ) / 2 / $scope.t.x;
			}
		};

		$scope.printBoard = function(part, type) {
			if ($scope.layout == '0')
			{
				print.board($scope.b[$scope.boardType].x, part, type);
			}
			else
			{
				print.board(part, $scope.b[$scope.boardType].x, type);
			}
		};

		$scope.printStep = function(i, key) {
			if ($scope.layout == '0')
			{
				print.col(i);
			}
			else
			{
				print.row(i, key);
			}
		}

		$scope.cards = [
			{
				description : 'deska tarasowa blooma swierk 2400 x 144 x 27 mm brazowa',
				price:'29'
			},
			{
				description : 'deska tarasowa blooma MODRZEW EUROPEJSKI 2500 x 140 x 24 mm',
				price:'29'
			},
			{
				description : 'deska tarasowa blooma SOSNA 20 x 95 x 2400 mm zielona ',
				price:'29'
			},
			{
				description : 'deska tarasowa blooma SOSNA 20 x 95 x 2400 mm zielona ',
				price:'29'
			}
			,
			{
				description : 'deska tarasowa blooma SOSNA 20 x 95 x 2400 mm zielona ',
				price:'29'
			}
			,
			{
				description : 'deska tarasowa blooma SOSNA 20 x 95 x 2400 mm zielona ',
				price:'29'
			}
		]

	});
})()
;
