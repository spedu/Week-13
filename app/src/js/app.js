angular.module('resthitter', ['ui.bootstrap', 'ngResource', 'ngRoute'])
.config(['$routeProvider', function($routeProvider){
  $routeProvider
  .when('/', {
    templateUrl: 'templates/list.html',
    controller: 'ListController',
    controllerAs: 'lc'
  })
  .when('/:myid', {
    templateUrl: 'templates/detail.html',
    controller: 'DisplayController',
    controllerAs: 'dc'
  })
  .when('/:myid/edit', {
    templateUrl: 'templates/edit.html',
    controller: 'EditController',
    controllerAs: 'ec'
  })
  .when('/edit', { // going to wrong route because /:myid up there could be a string!
    templateUrl: 'templates/edit.html',
    controller: 'EditController',
    controllerAs: 'ec'
  });


}]);
