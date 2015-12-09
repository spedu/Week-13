angular.module('resthitter').controller('DetailController', ['People', '$routeParams', '$location', function(People, $routeParams, $location){
  var dc = this;
  //dc.person = {id: 1, name: "Placeholder", twitter: "@placeholder"};
  dc.person = People.get({id: $routeParams.id});

  dc.save = function(){
    dc.person.$save().then(function(){
      $location.path('/');
    });
  };

}]);
