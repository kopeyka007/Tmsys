(function(){
    angular.module('app', ['ngRoute' , 'ui.bootstrap', 'ngFileUpload', 'ngAnimate', 'ngTouch', 'ngSanitize', 'ngMessages']).directive('ngFileSelect', [ '$parse', '$timeout', function($parse, $timeout) {
    return function(scope, elem, attr) {
            var fn = $parse(attr['ngFileSelect']);
            elem.bind('change', function(evt) {
                var files = [], fileList, i;
                fileList = evt.target.files;
                if (fileList != null) {
                    for (i = 0; i < fileList.length; i++) {
                        files.push(fileList.item(i));
                    }
                }
                $timeout(function() {
                    fn(scope, {
                        $files : files,
                        $event : evt
                    });
                });
            });
        };
    }]);
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
        .when('/admin', {
            templateUrl :'/view/pages/admin',
            controller:'AdminController'
        })
    }])
})()

;