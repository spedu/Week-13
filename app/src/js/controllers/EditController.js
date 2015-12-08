angular.module('resthitter').controller('EditController', ['Name', '$routeParams', '$location', function(Name, $routeParams, $location){
  var ec = this;

  ec.name = Name.get({id: $routeParams.myid});

  ec.submit = function(){
    //Name.save({}, ec.name, function(){
    //  $location.path('/' + ec.name.id);
    //});

    var name = new Name(ec.name);
    ec.name.$save().then(function(){
      console.log("asdf");
      $location.path('/' + name.id);
    })
  };
}]);
