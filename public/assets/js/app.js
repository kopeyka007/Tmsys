(function(){
    angular.module('app', ['ngRoute' , 'ui.bootstrap', 'ngAnimate', 'ngTouch', 'ngSanitize', 'ngMessages', 'toastr']);
})()

;

(function(){
    angular.module('app').config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        $routeProvider
        .when('/', {
            templateUrl :'/view/pages/step_one',
            controller:'StepOneController'
        })
        .when('/step_two', {
            templateUrl :'/view/pages/step_two',
            controller:'StepTwoController'
        })
        .when('/step_three/:params', {
            templateUrl :'/view/pages/step_three',
            controller:'StepThreeController'
        })
        .when('/step_three', {
            templateUrl :'/view/pages/step_three',
            controller:'StepThreeController'
        })
        .when('/step_four/:params', {
            templateUrl :'/view/pages/step_four',
            controller:'StepFourController'
        })
        .when('/step_four', {
            templateUrl :'/view/pages/step_four',
            controller:'StepFourController'
        })
          
    }])
})()

;