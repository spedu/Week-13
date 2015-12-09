angular.module('resthitter').controller('DisplayController', ['Name', '$routeParams', '$location', function(Name, $routeParams, $location){
  var dc = this;

  dc.name = Name.get({id: $routeParams.myid});

  dc.editView = function(){
    $location.path('/name/'+dc.name.id+'/edit');
  };

  dc.save = function(){
    dc.name.$save().then(function(){
      $location.path('/');
    });
  };

}]);
