(function(){
    angular.module('app', ['ngRoute' , 'ui.bootstrap',
    , 'ngAnimate', 'ngTouch', 'ngSanitize', 'ngMessages', 'toastr']);
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
            templateUrl : "/view/step-one.html",
            controller:"StepOneController"
        })
        .when("/step-two", {
            templateUrl : "/view/step-two.html",
            controller:"StepTwoController"
        })
        .when("/step-three/:params", {
            templateUrl : "/view/step-three.html",
            controller:"StepThreeController"
        })
        .when("/step-three", {
            templateUrl : "/view/step-three.html",
            controller:"StepThreeController"
        })
        .when("/step-four/:params", {
            templateUrl : "/view/step-four.html",
            controller:"StepFourController"
        })
        .when("/step-four", {
            templateUrl : "/view/step-four.html",
            controller:"StepFourController"
        })
        .otherwise({
            redirectTo:'/'
        })   
    }])
})()

;