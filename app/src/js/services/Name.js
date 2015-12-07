angular.module('resthitter').factory('Name', ['$resource', function($resource){
  return $resource('http://localhost:7000/names/:id');
}]);
