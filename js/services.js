'use strict';
/* Services */
var services = angular.module('ngdemo.services', [ 'ngResource' ]);
// se obtiene el recurso JSON haciendo uso de una llamada a una API de tipo REST

// Se crea el modulo de servicio para tareas de usuario.
services.factory('UserTaskService', function($http) {
	return {
		getUserTaskData : function(url) {
			return $http.post(url).then(function(result) {
				return result.data;
			});
		}
	};

});
