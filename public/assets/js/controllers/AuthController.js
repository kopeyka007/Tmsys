(function() {
	angular.module("app").controller("AuthController", function($rootScope, $scope, $location, $timeout, $routeParams, print, request, connect, logger) {

		$scope.signin = function()
		{
			if ($scope.form_signin.$valid)
			{
				request.send("/api/auth/signin", { 
					email : $scope.email,
					password : $scope.password,
				}, function(data){
					if (data.data)
					{
						$timeout(function(){
							window.location.reload();
						}, 1000);
					}
				});
			}
		}
	})
})()

