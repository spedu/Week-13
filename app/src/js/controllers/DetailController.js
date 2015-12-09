angular.module('resthitter').controller('DetailController', ['People', '$routeParams', '$location', function(People, $routeParams, $location){
  var dc = this;
  //dc.person = {id: 1, name: "Placeholder", twitter: "@placeholder"};

  if($routeParams.id === undefined){
    dc.person = new People();
    dc.person.name = "placeholder";
    dc.person.twitter = "placeholder";
  } else {
    dc.person = People.get({id: $routeParams.id});
  }

  dc.save = function(){
    dc.person.$save().then(function(){
      $location.path('/');
    });
  };

}]);
