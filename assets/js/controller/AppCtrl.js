
(function() {
	angular.module("app").controller("AppCtrl", function($rootScope, $scope, print, connect, ModalService) {
		$scope.board = {'x': 90, 'y': [1000, 1000]};
		$scope.seam = 10;
		$scope.split = ($scope.board.y[0] / 10) / 2;
		$scope.terrace = {'x': [2, 1], 'y': [1, 1] , 'z':[2, 2]};
		$scope.margin = {'x': [0, 0], 'y': [0, 0], 'z':[0, 0]};
		$scope.layout = '0';
		$scope.angle = '0';
		$scope.v = {}; 
		$scope.v.type = '0';
		$scope.v.twoBoards = false;
		$scope.v.laying = 'evenly';
		$scope.t = false;
		$scope.b = [{}, {}];
		$scope.restsStack = [];
		$scope.startY = false;
		$scope.colsStart = 0;
		$scope.boardType = 0;
		$scope.boardsCount = [{ 0: 0, 1: 0 }, { 0: 0, 1: 0 }, { 0: 0, 1: 0 },{ 0: 0, 1: 0 }, { 0: 0, 1: 0 }, { 0: 0, 1: 0 }];

		$scope.v.unitStart = true;//закрытая форма
		$scope.blurBlock = false;// размытие блока
		$scope.fullDisabled = true;//заблокированый блок

		//Подсветка бордеров
		$scope.borderFigureLeft = false;
		$scope.borderFigureTwoTop = false;
		$scope.borderFigureTwoLeft = false;
		$scope.borderFigureBottom = false;
		$scope.trapezeRight = false;
		$scope.trapezeTop = false;
		$scope.boardName = 'your param board '; //параметры доски юзера
		$scope.boardPrice = ''; //цена доски юзера

		$scope.boardVar = [0, 1, 2, 3, 4, 5];
		$scope.variants = [
			{
				twoBoards: false,
				laying : 'evenly',
				layout : 0
			},
			{
				twoBoards : false,
				laying : 'emporally',
				layout : 0
			},
			{
				twoBoards : true,
				laying : 'evenly',
				layout : 0
			},
			{
				twoBoards: false,
				laying : 'evenly',
				layout : 1
			},
			{
				twoBoards : false,
				laying : 'emporally',
				layout : 1
			},
			{
				twoBoards : true,
				laying : 'evenly',
				layout : 1
			}
		];

		$scope.blurBlockChange = function() {
			$scope.blurBlock = true;
		};

		$scope.fullDisabledChange = function() {
			$scope.fullDisabled = false;
		};

		$scope.initForm = function(formbBoardY0, formbBoardX, formSeam) {//инициализация формы
			$scope.formbBoardY0 = $scope.board.y[0];
			$scope.formbBoardX = $scope.board.x;
			$scope.formSeam = $scope.seam;
		};

		$scope.boardParamForm = function(formbBoardY0, formbBoardX, formSeam) {//параметры из формы
			$scope.board.y[0] = formbBoardY0;
			$scope.board.x = formbBoardX;
			$scope.seam = formSeam;
			$scope.boardName = 'your param board ' +  $scope.board.y[0] + ' X '+  $scope.board.x + ' X ' + $scope.seam ;
			$scope.boardPrice = '10';
		};

		$scope.boardParamsL = function(card) {//параметры из досок
			$scope.board.x = card.paramBoardX;
			$scope.board.y[0] = card.paramBoardY;
			$scope.seam = 10;
		};

		$scope.boardParamsR = function(card) {//параметры из досок
			$scope.board.x = card.paramBoardX;
			$scope.board.y[0] = card.paramBoardY;
			$scope.seam = 10;
		};
		$scope.boardGiveParams = function(name, price){//параметры доски юзера
			$scope.boardName = name;
			$scope.boardPrice = price;
		}

		$scope.clearVars = function() {
			$scope.colsStart = 0;
			$scope.boardType = 0;
			$scope.deltaFromBegin = 0;
			$scope.mirrorStart = 1;
		};

		$scope.calculate = function() {
			$scope.restsStack = [];
			$scope.boardsCount = [{ 0: 0, 1: 0 }, { 0: 0, 1: 0 }, { 0: 0, 1: 0 },{ 0: 0, 1: 0 }, { 0: 0, 1: 0 }, { 0: 0, 1: 0 }];
			$scope.board.y[1] = $scope.board.y[0];//пока не узнаем КАК ПЕРЕДАВАТЬ ВТОРОЙ ПАРАМЕТР В NG-REPEAT
			$scope.b[0] = {'x': ($scope.board.x / 10 + $scope.seam / 10), 'y': $scope.board.y[0]  /  10};
			$scope.b[1] = {'x': ($scope.board.x  / 10 + $scope.seam  / 10), 'y': $scope.board.y[1]  / 10};
			$scope.split = ($scope.b[0].y / 2);
			print.reset();

			for (var i = 0 ; i < $scope.boardVar.length; i++)
			{
				$scope.v.twoBoards = $scope.variants[i].twoBoards;
				$scope.v.laying = $scope.variants[i].laying;
				$scope.layout = $scope.variants[i].layout;
				$scope.startY = ($scope.v.twoBoards ? $scope.b[1].y : $scope.split) * 1;
				$scope.canvasNumber = i;

				if ($scope.v.type == '0')
				{
					$scope.computeType0();
				}
				else if($scope.v.type == '1')
				{
					$scope.computeType1();
				}
				else if ($scope.v.type == '2')
				{
					$scope.computeType2();
				}
				else if ($scope.v.type == '3')
				{
					$scope.computeType3();
				}
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
					print.startWidth($scope.b[0].y);
					print.init($scope.t.x, $scope.t.y, $scope.v.type, $scope.angle, i, $scope.canvasNumber);
					$scope.trapeze();
				}
				else
				{
					$scope.t = {'x': $scope.terrace.z[i] * 100, 'y': $scope.terrace.y[i] * 100};
					print.startWidth($scope.b[0].y);
					print.init($scope.t.x, $scope.t.y, $scope.v.type, $scope.angle, i, $scope.canvasNumber);
					$scope.rectangle();

					$scope.t = {'x': $scope.terrace.x[i] * 100, 'y': ($scope.terrace.y[i] - $scope.terrace.z[i]) * 100};
					print.startWidth($scope.b[0].y);
					print.init($scope.t.x, $scope.t.y, $scope.v.type, $scope.angle, i, $scope.canvasNumber);
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
				t = {'x': ($scope.terrace.x[i] * 100).toFixed(0), 'y': $scope.terrace.y[i] * 100};
				print.startWidth($scope.b[0].y);
				print.init(t.x, t.y, $scope.v.type, $scope.angle, i, $scope.canvasNumber);
			}
			else
			{
				t = {'x': ($scope.terrace.y[i] * 100).toFixed(0), 'y': $scope.terrace.x[i] * 100};
				print.startWidth($scope.b[0].y);
				print.init(t.y, t.x, $scope.v.type, $scope.angle, i, $scope.canvasNumber);
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
			var allCols = cols;
				if ($scope.layout == 0)
				{
					cols = $scope.middleCol(cols);
					for (var i = (cols / 2) - 1; i >= 0; i--)
					{
						$scope.maxColY = $scope.getMaxCircleColY(i);	
						$scope.printStep(i);
						$scope.fillCol(true, false, i, allCols);

						$scope.printStep(cols - i - $scope.mirrorStart);
						$scope.fillCol(true, true, i, allCols);
					}
				}
				else
				{	
					for (var i = 0; i < cols ; i++)
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

		$scope.fillCol = function(indetificator, saveboard, i, cols) {
			saveboard = saveboard || false;
			indetificator = indetificator || false;
			$scope.boardType = 0;
			var start = $scope.boardY();//длина доски
			if($scope.v.laying == 'emporally' || $scope.v.twoBoards)
			{
				$scope.colsStart = 1 - $scope.colsStart;// с какого типа доски стартуем
				if (cols % 2 == 0)
				{
					if (indetificator && saveboard && i % 2 > 0)
					{
						$scope.colsStart = 1;
					}
					if (indetificator && saveboard && i % 2 == 0)
					{
						$scope.colsStart = 0;
					}
					if (indetificator && ! saveboard && i % 2 > 0)
					{
						$scope.colsStart = 0;
					}
					if (indetificator && ! saveboard && i % 2 == 0)
					{
						$scope.colsStart = 1;
					}
				}
				else
				{
					if ((( cols - 1) / 2) % 2 == 0)
					{
						if (indetificator && (saveboard || ! saveboard) && i % 2 == 0)
						{
							$scope.colsStart = 1;
						}
						if (indetificator && (saveboard || ! saveboard) && i % 2 > 0)
						{
							$scope.colsStart = 0;
						}
					}

					if ((( cols - 1) / 2) % 2 > 0 )
					{
						if (indetificator && (saveboard || ! saveboard) && i % 2 > 0)
						{
							$scope.colsStart = 1;
						}
						if (indetificator && (saveboard || ! saveboard) && i % 2 == 0)
						{
							$scope.colsStart = 0;
						}
					}
				}
				if ($scope.colsStart == 0)
				{
					start = $scope.startY;//с какой доски начинать--половины или целой второй
					if ($scope.v.twoBoards)
					{
						$scope.boardType = 1;
					}
				}
			}
			var colY = $scope.nextBoard(start);//уже положенная длина досок
			while (colY < $scope.maxColY)// пока длина меньше длины доски
			{
				colY += $scope.nextBoard($scope.boardY(), colY);//добавляем к уже положенной длинне новую длину
			}
			$scope.addRest(colY - $scope.maxColY);// отнимаем от длины длину
		};

		$scope.nextBoard = function(board, colY) {//принимает с какой доски начинать--половины или целой второй
			colY = colY || 0;
			var left = ($scope.maxColY - colY);//длина доски минус уже положенная длина досок
			var part = left > board ? board : left;// часть колонки, целая доска или половинка
			if ( ! $scope.checkInStack(part))//если в остатках нет ничего подходящего
			{
				$scope.printBoard(part, $scope.boardType);//печатаем доску
				$scope.boardsCount[$scope.canvasNumber][$scope.boardType]++;// добаляем количество досок
				$scope.addRest($scope.boardY() - part);// отнимаем от высоты доски часть положженную
			}
			if ($scope.v.twoBoards)
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
			for (var k in $scope.restsStack)// перебираем остатки
			{
				if ($scope.restsStack[k] > 0)// если остаток больше нуля
				{
					if ($scope.restsStack[k] >= part)// если остаток больше или равно части
					{
						$scope.printBoard(part, 2);//печатаем доску
						$scope.restsStack[k] -= part;
						return true;
					}
				}
			}
			return false;
		};

		$scope.addRest = function(part) {
			$scope.restsStack.push(part);// добавляем часть в статок

			var newStack = [];
			for (var k in $scope.restsStack) //перебираем остатки
			{
				if ($scope.restsStack[k] > 0)// если остатки больше нуля--добавляем в новый массив
				{
					newStack.push($scope.restsStack[k]);
				}
			}
			$scope.restsStack = newStack;// обновляем остатки
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
				return  ($scope.t.x * $scope.t.x  + $scope.t.y * $scope.t.y / 4 ) / 2 / $scope.t.x;
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
		};

		$scope.load = function() {
			$scope.v.unitStart = true;
			$scope.blurBlock = false;
			$scope.fullDisabled = true;
		};

	});
})()
;

