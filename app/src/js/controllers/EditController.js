angular.module('resthitter').controller('EditController', ['Name', '$routeParams', '$location', function(Name, $routeParams, $location){
  var ec = this;

  ec.name = Name.get({id: $routeParams.myid});

  ec.submit = function(){

    ec.name.$save().then(function(){
      $location.path('/name/' + name.id);
    });
    /*
    Name.save({}, ec.name, function(){
      $location.path('/name/' + name.id);
    });
    */
  };
}]);
