(function(){
    angular.module('app', ['ngRoute' , 'ui.bootstrap',
    , 'ngAnimate', 'ngTouch', 'ngSanitize']);
})()

;
(function(){
    angular.module('app').config(['$routeProvider', '$locationProvider', function($routeProvider , $locationProvider) {

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        $routeProvider
        .when("/", {
            templateUrl : "view/step-one.html"
        })
        .when("/step-two", {
            templateUrl : "view/step-two.html" 
        })
        .when("/step-three", {
            templateUrl : "view/step-three.html"
        })
        .when("/step-four", {
            templateUrl : "view/step-four.html"
        })
        .otherwise({
            redirectTo:'/'
        })
        
    }]);
})()

;


