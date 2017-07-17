(function() {
	angular.module("app").controller("CaruselCtrl", function($scope, connect) {

		$scope.cards = [
			{
				firstBoard : 'deska tarasowa blooma świerk <span>2400 x 144 x 27 mm</span> brązowa',
				secondBoard : 'deska tarasowa blooma świerk <span>1200 x 144 x 27 mm</span> brązowa',
				priceFirstBoard:'29.96',
				priceSecondBoard:'19.96',
				srcTerrace:'assets/img/t-1.png',
				srcBoard:'assets/img/board-drew-1.jpg',
				paramBoardX : '144',//в контроллере при принятии параметров нужно обозначить 2-ю доску,как необязательный параметр
				paramBoardY : '2400',//и добавить функционал ее обсчета
				paramSecondBoardX : '144',//в контроллере при принятии параметров нужно обозначить 2-ю доску,как необязательный параметр
				paramSecondBoardY : '1200'//и добавить функционал ее обсчета
			},{
				firstBoard : 'deska tarasowa blooma modrzew europejski <span>2500 x 140 x 24 mm </span>',
				priceFirstBoard:'29.96',
				srcTerrace:'assets/img/t-2.png',
				srcBoard:'assets/img/board-drew-2.jpg',
				paramBoardX : '140',
				paramBoardY : '2500'
			},{
				firstBoard : 'deska tarasowa blooma sosna <span>20 x 95 x 2400 mm </span> zielona',
				priceFirstBoard:'9.98',
				srcTerrace:'assets/img/t-3.png',
				srcBoard:'assets/img/board-drew-3.jpg',
				paramBoardX : '95',
				paramBoardY : '2400'
			},{
				firstBoard : 'DESKA TARASOWA DREWNIANA BLOOMA  <span>3600 X 144 X 27 MM</span> ŚWIERK',
				secondBoard : 'DESKA TARASOWA DREWNIANA BLOOMA <span>2400 X 144 X 27 MM </span> ŚWIERK',
				priceFirstBoard:'48.94',
				priceSecondBoard:'38.94',
				srcTerrace:'assets/img/t-4.png',
				srcBoard:'assets/img/board-drew-4.jpg',
				paramBoardX : '144',
				paramBoardY : '3600',
				paramSecondBoardX : '144',
				paramSecondBoardY : '1200'
			},{
				firstBoard : 'DESKA TARASOWA DREWNIANA DLH <span>21 X 145 MM </span> BANGKIRAI',
				priceFirstBoard:'30.98',
				srcTerrace:'assets/img/t-5.png',
				srcBoard:'assets/img/board-drew-5.jpg',
				paramBoardX : '21',
				paramBoardY : '145'
			},{
				firstBoard : 'deska tarasowa blooma świerk <span>2400 x 144 x 27 mm</span> brązowa',
				secondBoard : 'deska tarasowa blooma świerk <span>1200 x 144 x 27 mm</span> brązowa',
				priceFirstBoard:'29.96',
				priceSecondBoard:'19.96',
				srcTerrace:'assets/img/t-1.png',
				srcBoard:'assets/img/board-drew-1.jpg',
				paramBoardX : '144',//в контроллере при принятии параметров нужно обозначить 2-ю доску,как необязательный параметр
				paramBoardY : '2400',//и добавить функционал ее обсчета
				paramSecondBoardX : '144',//в контроллере при принятии параметров нужно обозначить 2-ю доску,как необязательный параметр
				paramSecondBoardY : '1200'//и добавить функционал ее обсчета
			},{
				firstBoard : 'deska tarasowa blooma modrzew europejski <span>2500 x 140 x 24 mm </span>',
				priceFirstBoard:'29.96',
				srcTerrace:'assets/img/t-2.png',
				srcBoard:'assets/img/board-drew-2.jpg',
				paramBoardX : '140',
				paramBoardY : '2500'
			},{
				firstBoard : 'deska tarasowa blooma sosna <span>20 x 95 x 2400 mm </span> zielona',
				priceFirstBoard:'9.98',
				srcTerrace:'assets/img/t-3.png',
				srcBoard:'assets/img/board-drew-3.jpg',
				paramBoardX : '95',
				paramBoardY : '2400'
			},{
				firstBoard : 'DESKA TARASOWA DREWNIANA BLOOMA  <span>3600 X 144 X 27 MM</span> ŚWIERK',
				secondBoard : 'DESKA TARASOWA DREWNIANA BLOOMA <span>2400 X 144 X 27 MM </span> ŚWIERK',
				priceFirstBoard:'48.94',
				priceSecondBoard:'38.94',
				srcTerrace:'assets/img/t-4.png',
				srcBoard:'assets/img/board-drew-4.jpg',
				paramBoardX : '144',
				paramBoardY : '3600',
				paramSecondBoardX : '144',
				paramSecondBoardY : '1200'
			},{
				firstBoard : 'DESKA TARASOWA DREWNIANA DLH <span>21 X 145 MM </span> BANGKIRAI',
				priceFirstBoard:'30.98',
				srcTerrace:'assets/img/t-5.png',
				srcBoard:'assets/img/board-drew-5.jpg',
				paramBoardX : '21',
				paramBoardY : '145'
			}
		];

		$scope.caruselClass = [];
		$scope.positionItems = {};

		$scope.positionItems[1] = '0';
    	$scope.positionItems[2] = '1';
    	$scope.positionItems[3] = '2';
    	$scope.positionItems[4] = '3';

		$scope.nextFunc =  connect.next;
		$scope.prevFunc =  connect.prev;

		$scope.positionClasses = connect.getPositionClasses($scope.cards, $scope.positionItems);

		$scope.caruselGiveClass = function() {
			for (var key in  $scope.positionClasses)
            {
            	if ($scope.positionClasses[key] == "after")
            	{
            		$scope.caruselClass[key] = "sliderAfter";
            	}

            	if ($scope.positionClasses[key] == "before")
            	{
            		$scope.caruselClass[key] = "sliderBefore";
            	}

            	if ($scope.positionClasses[key] != "after" && $scope.positionClasses[key] != "before")
            	{
            		$scope.caruselClass[key] = 'slider' + $scope.positionClasses[key];
            	}
            }
		};

		$scope.caruselGiveClass();

		$scope.next = function() {
			$scope.nextFunc($scope.cards, $scope.positionItems);
			$scope.caruselGiveClass();
		};

		$scope.prev = function() {
			$scope.prevFunc($scope.cards, $scope.positionItems);
			$scope.positionClasses = connect.getPositionClasses($scope.cards, $scope.positionItems);
			$scope.caruselGiveClass();
		};
	});
})()
;