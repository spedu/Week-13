angular.module('resthitter').controller('DetailController', ['People', '$routeParams', function(People, $routeParams){
  var dc = this;
  //dc.person = {id: 1, name: "Placeholder", twitter: "@placeholder"};
  dc.person = People.get({id: $routeParams.id});
}]);
