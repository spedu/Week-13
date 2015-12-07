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
  });


}]);
