<!DOCTYPE html>
<html lang="en" data-ng-app="app">
  	<head>
		<meta charset="utf-8"/>
		<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
		<meta name="csrf-token" content="{{ csrf_token() }}">
		<title>Boards</title>
		<link rel="stylesheet" href="/assets/css/fonts.css"/>
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"/>
		<link rel="stylesheet" href="/assets/js/toastr/toastr.min.css"/>
		<link rel="stylesheet" href="/assets/css/angular-bootstrap-file-upload.css"/>
		<link rel="stylesheet" href="/assets/css/style.css"/>
		
	</head>
<body  data-ng-controller="AppCtrl">

	<div class="view-container" data-ng-class="{last: lasted == 1}">
		<div  ng-view class="slide @{{ pageDirect }}"></div>
	</div>
	
	<script src="/assets/js/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	<script src="/assets/js/angular.min.js"></script>

	<script src="/assets/js/module/angular-route.js"></script>
	<script src="/assets/js/module/angular-animate.min.js"></script>
	<script src="/assets/js/module/angular-touch.min.js"></script>
	<script src="/assets/js/module/ui-bootstrap-tpls-2.5.0.min.js"></script>
	<script src="/assets/js/module/ng-file-upload.min.js"></script>
	<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.6.3/angular-messages.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.0/angular-sanitize.js"></script>
	<script src="https://rawgit.com/dwmkerr/angular-modal-service/master/dst/angular-modal-service.js"></script>
	<script src="/assets/js/toastr/toastr.min.js"></script>

	<script src="/assets/js/app.js"></script>

	<script src="/assets/js/controllers/AppCtrl.js"></script>
	<script src="/assets/js/controllers/StepOneController.js"></script>
	<script src="/assets/js/controllers/StepTwoController.js"></script>
	<script src="/assets/js/controllers/StepThreeController.js"></script>
	<script src="/assets/js/controllers/StepFourController.js"></script>
	<script src="/assets/js/controllers/AuthController.js"></script>
	<script src="/assets/js/controllers/AdminController.js"></script>
	<script src="/assets/js/factory/connect.js"></script>
	<script src="/assets/js/factory/print.js"></script>
	<script src="/assets/js/factory/request.js"></script>
	<script src="/assets/js/factory/logger.js"></script>
	
</body>
</html>

