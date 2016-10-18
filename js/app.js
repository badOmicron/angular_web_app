'use strict';

// Aqui se declara el modulo principal y todas las dependencias, y los servcios.
var app = angular.module('ngdemo', [ 'ngdemo.services', 'ngdemo.controllers' ]);
// routeProvider --> Mecanisco para redireccionar a cada una de las pàginas
// (mòdulos) de la aplicaciòn.
app.config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/Admin', {
		templateUrl : 'partials/home.html',
		controller : 'HomeCtrl'
	});
	// Cuando la URL sea igual a /Admin el template admin.html sera cargado. Y
	// se vinvula con el Controllador
	$routeProvider.when('/Admin', {
		templateUrl : 'partials/admin.html',
		controller : 'AdminProcCtrl'
	});
	$routeProvider.when('/usertasks', {
		templateUrl : 'partials/usertasks.html',
		controller : 'UserTaskCtrl'
	});
	// Si a ruta en el URL no coincide con alguna de las 'rutas' declaradas
	// entonces redirecciona a este template.
	$routeProvider.otherwise({
		redirectTo : '/'
	});
} ]);
