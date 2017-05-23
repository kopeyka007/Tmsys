(function() {
	angular.module("app").controller("CaruselFigureCtrl", function($scope, carusel, connect) {

		$scope.figures = [
			{
				description : 'deska tarasowa blooma swierk 2400 x 144 x 27 mm ',
				price:'29.96',
				src:'assets/img/rectangle.png'
			},
			{
				description : 'deska tarasowa blooma MODRZEW EUROPEJSKI 2500 x 140 x 24 mm',
				price:'29.96',
				src:'assets/img/rectangle-two.png'
			},
			{
				description : 'deska tarasowa blooma SOSNA 20 x 95 x 2400 mm zielona ',
				price:'9.96',
				src:'assets/img/rectangle-circle.png'
			},
			{
				description : 'deska tarasowa blooma swierk 2400 x 144 x 27 mm brazowa',
				price:'29.96',
				src:'assets/img/trapeze.png'
			},
			{
				description : 'deska tarasowa blooma swierk 2400 x 144 x 27 mm brazowa',
				price:'29.96',
				src:'assets/img/trapeze.png'
			}
		];

		$scope.figureArr = true;
		$scope.position = carusel.position;
		$scope.caruselClass = carusel.getClasses($scope.figures, $scope.figureArr);
		$scope.next =  carusel.next;
		$scope.prev =  carusel.prev;
	});
})()
;