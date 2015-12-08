angular.module('resthitter').controller('ListController', ['Name', '$location', function(Name, $location){
  var lc = this;
  lc.names = Name.query(function(){
    console.log("getNames");
  });

  lc.new = function(){
    $location.path('/edit');
  };

}]);
