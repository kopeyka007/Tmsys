
(function() {
	angular.module("app").controller("AppCtrl", function($rootScope, $scope, $location, $timeout, $routeParams, $anchorScroll, print, connect, request, logger) {
		/*================================================================================================================*
								            TERRACE CALCULATE FUNCTIONALITY
		==================================================================================================================*/
		$scope.board = {'x': 100, 'y': [1000, 1000]};
		$scope.seam = 10;
		$scope.split = ($scope.board.y[0] / 10) / 2;
		$scope.terrace = {'x': [0, 0], 'y': [0, 0] , 'z':[0, 0]};
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
		
		$scope.side = [];
		$scope.cards = [];
		$scope.cena = 1;
		
		$scope.boardType = 0;
		$scope.boardsCount = [{ 0: 0, 1: 0 }, { 0: 0, 1: 0 }, { 0: 0, 1: 0 },{ 0: 0, 1: 0 }, { 0: 0, 1: 0 }, { 0: 0, 1: 0 }];
		$scope.boardName = 'your param board '; 
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
		
		$scope.initForm = function(formbBoardY0, formbBoardX, formSeam) {//инициализация формы
			$scope.formbBoardY0 = 1000;
			$scope.formbBoardX = 90;
			$scope.formSeam = 10;
			$scope.formCena = 1;
			$scope.board.y[1] = 0;
		};

		$scope.boardParamForm = function(formbBoardY0, formbBoardX, formSeam, formCena) {//параметры из формы
			$scope.board.y[0] = formbBoardY0;
			$scope.board.x = formbBoardX;
			$scope.seam = formSeam;
			$scope.cena = formCena;
		};
			
		$scope.boardParamsList = function (card) {
			card = card || false;

			if (card.boards[1])
			{
				$scope.board.y[1] = card.boards[1].height;
			}
			else
			{
				$scope.board.y[1] = 0;
			}

			$scope.board.x = card.boards[0].width;
			$scope.board.y[0] = card.boards[0].height;
			$scope.seam = 10;
		};

		$scope.removeSide = function() {
			$scope.side = [];
		};

		$scope.clearVars = function() {
			$scope.colsStart = 0;
			$scope.boardType = 0;
			$scope.deltaFromBegin = 0;
			$scope.mirrorStart = 1;
		};

		$rootScope.calculate = function() {
			$scope.restsStack = [];
			$scope.boardsCount = [{ 0: 0, 1: 0 }, { 0: 0, 1: 0 }, { 0: 0, 1: 0 }, { 0: 0, 1: 0 }, { 0: 0, 1: 0 }, { 0: 0, 1: 0 }];
			
			$scope.b[0] = {'x': ($scope.board.x / 10 + $scope.seam / 10), 'y': $scope.board.y[0]  /  10};
			$scope.b[1] = {'x': ($scope.board.x  / 10 + $scope.seam  / 10), 'y': $scope.board.y[1]  / 10};

			$scope.split = ($scope.b[0].y / 2);

			print.reset();

			for (var i = 0 ; i < $scope.boardVar.length; i++)
			{
				$scope.v.twoBoards = $scope.variants[i].twoBoards;
				$scope.v.laying = $scope.variants[i].laying;
				$scope.layout = $scope.variants[i].layout;
				$scope.side.push($scope.layout);
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
				$scope.terrace.x[i] = $scope.terrace.x[i].toString().replace(',', '.') * 1;
				$scope.terrace.y[i] = $scope.terrace.y[i].toString().replace(',', '.') * 1;
				$scope.terrace.z[i] = $scope.terrace.z[i].toString().replace(',', '.') * 1;
				if (i == 0)
				{
					$scope.layout = 1;
					$scope.t = {'x': ($scope.terrace.y[i] * 100).toFixed(0), 'y': ($scope.terrace.x[i] * 100).toFixed(0), 'z': $scope.terrace.z[i] * 100};
					print.init($scope.t.x, $scope.t.y, $scope.v.type, $scope.angle, i, $scope.canvasNumber);
					print.startWidth($scope.b[0].y);
					$scope.trapeze(i);
				}
				else
				{
					$scope.layout = 0;
					$scope.t = {'x': ($scope.terrace.x[i] * 100).toFixed(0), 'y': ($scope.terrace.y[i] * 100).toFixed(0), 'z': $scope.terrace.z[i] * 100};
					print.init($scope.t.x, $scope.t.y, $scope.v.type, $scope.angle, i, $scope.canvasNumber);
					print.startWidth($scope.b[0].y);
					$scope.trapeze(i);
				}	 
			}
		};
		$scope.trapeze = function(terace) {
			$scope.clearVars();

			var cols = $scope.colsCount();
			if ($scope.layout == '0')
			{
				for (var i = 0; i < cols; i++)
				{
					$scope.maxColY = $scope.getMaxTrapezeColY(i);
					$scope.printStep(i);
					$scope.fillCol();
				}
			}
			else
			{
				for (var i = 0; i < cols; i++)
				{
					$scope.maxColY = $scope.getMaxTrapezeRowY(i);
					$scope.printStep(i, $scope.maxColY);
					$scope.fillCol();
				}
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
			if ($scope.layout == '1')
			{
				return Math.ceil($scope.t.y / $scope.b[$scope.boardType].x);	
			}
			else
			{
				return Math.ceil($scope.t.x / $scope.b[$scope.boardType].x);	
			}		
		};

		$scope.fillCol = function(indetificator, saveboard, i, cols) {
			saveboard = saveboard || false;
			indetificator = indetificator || false;
			$scope.boardType = 0;
			var start = $scope.boardY(); //длина доски
			if($scope.v.laying == 'emporally' || $scope.v.twoBoards)
			{
				$scope.colsStart = 1 - $scope.colsStart;// с какого типа доски стартуем

				if ($scope.layout == '0')
				{
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

				//localStorage.setItem('boardsCount', JSON.stringify(
					//[
						//{ 0: $scope.boardsCount[1][0], 1 :$scope.boardsCount[1][1] }, 
						//{ 0: $scope.boardsCount[1][0], 1 :$scope.boardsCount[1][1] }, 
						//{ 0: $scope.boardsCount[2][0], 1 :$scope.boardsCount[2][1] },
						//{ 0: $scope.boardsCount[3][0], 1 :$scope.boardsCount[3][1] }, 
						//{ 0: $scope.boardsCount[4][0], 1 :$scope.boardsCount[4][1] }, 
						//{ 0: $scope.boardsCount[5][0], 1 :$scope.boardsCount[5][1] }
					//]
				//));

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
			var xFromBegin = (colNumber + 1) * $scope.b[$scope.boardType].x + $scope.deltaFromBegin
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

		$scope.getMaxTrapezeRowY = function(colNumber) {
			var a = $scope.t.x - $scope.t.z;
			var ctgA = a / $scope.t.y;
			var c = $scope.t.y - (colNumber + 1) * $scope.b[$scope.boardType].x;
			return Math.ceil($scope.t.x - c * ctgA);
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

		/*================================================================================================================*
								            STYLE VIEW AND OTHER FUNCTIONALITY
		==================================================================================================================*/

		$scope.deska = 'composite';
		$scope.v.unitStart = true; //закрытая форма
		$scope.cardInfo = {};
		$scope.idPage = 0;
		$scope.cardInfo = {};

		$scope.typeDeska = function(type) { //выбор между композитной и деревенной первый шаг
			$scope.deska = type;
			$scope.cardsList = [];

			if ($scope.deska == 'wooden')
			{
				$scope.cards.filter(function(item, i, arr) {

					if (item.type_board == 'drevniana')
					{
						$scope.cardsList.push(item);
					}
				});
				return $scope.cardsList
			}
			if ($scope.deska == 'composite')
			{
				$scope.cards.filter(function(item, i, arr) {

					if (item.type_board == 'kompozyt')
					{
						$scope.cardsList.push(item);
					}
				});
				return $scope.cardsList;
			}
		};

		$scope.scroll = function () {
        	$anchorScroll();
      	};

		$scope.changeRoute = function (view, pageDirect, id) { //переход по роутам вне тега <a>
			id = id || false;
			view = id ? view + id : view;
    		$location.path(view);
    		$scope.pageDirect = pageDirect;
		};

		request.send('/api/stepone/getBoards', {}, function(data) {
			$scope.cards = data.data;
		});

		$scope.addElements = function() {
			$scope.cardInfo.element = 'ELEMENT DYSTANSOWY BLOOMA STALOWY';
			$scope.cardInfo.elementPrice = '1.08';
			$scope.cardInfo.zacisk = 'ZACISK POCZĄTKOWY/KOŃCOWY BLOOMA STALOWY';
			$scope.cardInfo.zaciskPrice = '0.98';
			$scope.cardInfo.legar = 'LEGAR TARASOWY DREWNIANY BLOOMA 2400 X 3RLIPS8 X 62 MM SOSNA';
			$scope.cardInfo.legarPrice = '14.98';
		};

		$scope.getParamBoards = function () { 
      		$scope.const = $routeParams.params * 1;

			if (! $scope.const)
			{
				
				$scope.cardInfo = {
					board_img: '/storage/images/form-board.jpg',
					terrace_img: '/storage/images/form-terrace.jpg',
					name: 'DESKA',
					boards: [{
						name: 'DESKA',
						width: $scope.board.x,
						height: $scope.board.y[0],
						thickness: $scope.seam,
						unit: 'MM',
						brand: '',
						price: $scope.cena + '.00'
					}]
				};

				$scope.addElements();
				$scope.getArr($scope.cardInfo);
			}
			else 
			{
				for (var i in $scope.cards) 
				{
					if ($scope.cards[i].id == $scope.const)
					{
						$scope.cardInfo = $scope.cards[i];
					}
				}

				$scope.addElements();
				$scope.getArr($scope.cardInfo);
			}
		};

		$scope.getArr = function(arr) {
			$scope.cardInfo = {};
			return $scope.cardInfo = arr;
		};

		$scope.lastend = function(type) { 
			$scope.lasted = type;
		};

		$scope.validation = function (text) {
			logger.logError(text);
		}

		$scope.signout = function()
        {
            request.send("/api/auth/signout", {}, function(){
               	$timeout(function(){
                    window.location.reload();
                }, 1000);
            });
        }
		
		/*$scope.sendMail = function() {
			$scope.cardInfo.email = $scope.v.email;
			request.send('/backEnd/sendmail.php', $scope.cardInfo, function(data) {}); 
		};*/

	});
})()
;
