angular.module('resthitter').controller('DetailController', ['$location', '$routeParams', 'People', function($location, $routeParams, People) {
  var dc = this;

  if($routeParams.id !== undefined) {
    dc.person = People.get({id: $routeParams.id});
  } else {
    dc.person = new People();
  }
  
  dc.save = function() {
    dc.person.$save().then(function() {
      $location.path('/');
    });
  };

}]);
