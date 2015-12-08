angular.module('resthitter').controller('DisplayController', ['Name', '$routeParams', '$location', function(Name, $routeParams, $location){
  var dc = this;

  dc.name = Name.get({id: $routeParams.myid}, function(name){
    console.log("Name.get");
  });

  dc.editView = function(){
    $location.path('/'+dc.name.id+'/edit');
  };

}]);
