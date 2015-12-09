angular.module('resthitter', ['ui.bootstrap', 'xeditable', 'ngResource', 'ngRoute'])
.run(['editableOptions', function(editableOptions){
  editableOptions.theme = 'bs3';
}])
.config(['$routeProvider', function($routeProvider){
  $routeProvider
  .when('/', {
    templateUrl: 'templates/list.html',
    controller: 'ListController',
    controllerAs: 'lc'
  })
  .when('/name/:myid', {
    templateUrl: 'templates/detail.html',
    controller: 'DisplayController',
    controllerAs: 'dc'
  })
  .when('/name/:myid/edit', {
    templateUrl: 'templates/edit.html',
    controller: 'EditController',
    controllerAs: 'ec'
  })
  .when('/name/edit', { // going to wrong route because /:myid up there could be a string!
    templateUrl: 'templates/edit.html',
    controller: 'EditController',
    controllerAs: 'ec'
  });
}]);
