'use strict';

/* Controllers */

var app = angular.module('ngdemo.controllers', []);


// Clear browser cache (in development mode)
//
// http://stackoverflow.com/questions/14718826/angularjs-disable-partial-caching-on-dev-machine
  app.run(function ($rootScope, $templateCache) {
    $rootScope.$on('$viewContentLoaded', function () {
      $templateCache.removeAll();
    });
  });


	app.controller('AdminProcCtrl', function($scope, $http,UserTaskService) {
    $scope.CreateProcess = function () {
	
	  $scope.tskState = { show: true }
	  var url = '/jbpmngwebexample/rest/json/tasks/createProcess?' + 'priority=' +$scope.priority +  '&modelNumber=' +$scope.modelNumber +'&quantity=' +$scope.quantity;
	  $scope.procStat = UserTaskService.getUserTaskData(url); 
         
		 if($scope.procStat)
	       $scope.procCreate = {show: true};
    
    }
   });
   
    
	
   
   app.controller('UserTaskCtrl', function($scope,$http,UserTaskService) {
    $scope.doSearchTasks = function () {
	   $scope.tskState = { show: true }
	  var url = '/jbpmngwebexample/rest/json/tasks/pending?user=' +$scope.user;
	  $scope.taskresults = UserTaskService.getUserTaskData(url);
     }
 

   
	
	$scope.taskWork = function(processId,taskid) {
	   var url = '/jbpmngwebexample/rest/json/tasks/processparams?processId=' +processId;
       $scope.tastdetId = taskid;
	    $scope.processId = processId;
	   
	   $http.post(url).then(function (res) {
         $scope.taskdetldata = res.data;  
	     $scope.taskDet = { show: true }
		 $scope.quantity = res.data.quantity;
		 $scope.modelNumber = res.data.modelNumber;
		 $scope.priority = res.data.priority;
		 
     
     })
    }
	   
	 
	 
	  $scope.CompleteTask = function(priority,modelNumber,quantity) {
	    var url = '/jbpmngwebexample/rest/json/tasks/compleTask?user=' +$scope.user +'&taskId=' +$scope.tastdetId  +'&priority=' +priority +'&modelNumber=' +modelNumber +'&quantity=' +quantity;
        $scope.taskresults = UserTaskService.getUserTaskData(url);
		if($scope.taskresults != null){
	     $scope.taskDet = false;
		 $scope.tskState = { show: true } 
       };
	 }
   });

	