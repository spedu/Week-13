angular.module('resthitter').controller('DisplayController', ['Name', '$routeParams', function(Name, $routeParams){
  var dc = this;

  dc.name = Name.get({id: $routeParams.myid}, function(name, getResponseHeaders){
    console.log("Name.get");
    console.log(name);
    console.log(getResponseHeaders);
  });

}]);
