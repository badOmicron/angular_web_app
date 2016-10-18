'use strict';

/* Deficiòn de los controladores */

var app = angular.module('ngdemo.controllers', []);

// Clear browser cache (in development mode)
//
// http://stackoverflow.com/questions/14718826/angularjs-disable-partial-caching-on-dev-machine
app.run(function($rootScope, $templateCache) {
	$rootScope.$on('$viewContentLoaded', function() {
		$templateCache.removeAll();
	});
});

// Se declara la funcionalidad de cada controlador.Cuando el template de admin
// es cargado el controlador AdminProcCtrl se ejecuta.
// Se le inyectan algunos elementos:
// $scope --> ayuda a compartir informaciòn entre la VISTA - CONTROLADOR
// $http --> ayuda a consumir los servicios REST
// UserTaskService -- Es el servicio al cuàl se le delega el consumo REST
app.controller('AdminProcCtrl', function($scope, $http, UserTaskService) {
	$scope.CreateProcess = function() {
		// variable local
		$scope.tskState = {
			show : true
		}
		// Esta es la url del servicio RESTful que sera consumido.
		// Se agregan sus respectivas variables despues del ?
		var url = '/jbpmngwebexample/rest/json/tasks/createProcess?'
				+ 'priority=' + $scope.priority + '&modelNumber='
				+ $scope.modelNumber + '&quantity=' + $scope.quantity;
		// Se consume el servicio y se atapa la respuesta en la variable
		// scope.procStat
		$scope.procStat = UserTaskService.getUserTaskData(url);
		// Se valida la respuesta y se habilita un mensaje de respuesa
		// en la vista, ver admin.html <span ng-show='procCreate.show'
		// class="label label-default">
		if ($scope.procStat)
			$scope.procCreate = {
				show : true
			};
	}
});

app.controller('UserTaskCtrl', function($scope, $http, UserTaskService) {
	$scope.doSearchTasks = function() {
		$scope.tskState = {
			show : true
		}
		var url = '/jbpmngwebexample/rest/json/tasks/pending?user='
				+ $scope.user;
		$scope.taskresults = UserTaskService.getUserTaskData(url);
	}

	$scope.taskWork = function(processId, taskid) {
		var url = '/jbpmngwebexample/rest/json/tasks/processparams?processId='
				+ processId;
		$scope.tastdetId = taskid;
		$scope.processId = processId;

		$http.post(url).then(function(res) {
			$scope.taskdetldata = res.data;
			$scope.taskDet = {
				show : true
			}
			$scope.quantity = res.data.quantity;
			$scope.modelNumber = res.data.modelNumber;
			$scope.priority = res.data.priority;

		})
	}

	$scope.CompleteTask = function(priority, modelNumber, quantity) {
		var url = '/jbpmngwebexample/rest/json/tasks/compleTask?user='
				+ $scope.user + '&taskId=' + $scope.tastdetId + '&priority='
				+ priority + '&modelNumber=' + modelNumber + '&quantity='
				+ quantity;
		$scope.taskresults = UserTaskService.getUserTaskData(url);
		if ($scope.taskresults != null) {
			$scope.taskDet = false;
			$scope.tskState = {
				show : true
			}
		}
		;
	}
});
