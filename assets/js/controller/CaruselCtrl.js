(function() {
	angular.module("app").controller("CaruselCtrl", function($scope, carusel, connect) {

		$scope.cards = [
			{
				description : 'deska tarasowa blooma swierk 2400 x 144 x 27 mm ',
				price:'29.96',
				src:'assets/img/board-1.jpg'
			},
			{
				description : 'deska tarasowa blooma MODRZEW EUROPEJSKI 2500 x 140 x 24 mm',
				price:'29.96',
				src:'assets/img/board-2.jpg'
			},
			{
				description : 'deska tarasowa blooma SOSNA 20 x 95 x 2400 mm zielona ',
				price:'9.96',
				src:'assets/img/board-3.jpg'
			},
			{
				description : 'deska tarasowa blooma swierk 2400 x 144 x 27 mm brazowa',
				price:'29.96',
				src:'assets/img/board-1.jpg'
			},
			{
				description : 'deska tarasowa blooma MODRZEW EUROPEJSKI 2500 x 140 x 24 mm',
				price:'29.96',
				src:'assets/img/board-2.jpg'
			},
			{
				description : 'deska tarasowa blooma SOSNA 20 x 95 x 2400 mm zielona ',
				price:'9.96',
				src:'assets/img/board-3.jpg'
			}
		];

		$scope.figureArr = false;
		$scope.position = carusel.position;
		$scope.caruselClass = carusel.getClasses($scope.cards, $scope.figureArr);
		$scope.next =  carusel.next;
		$scope.prev =  carusel.prev;
	});
})()
;