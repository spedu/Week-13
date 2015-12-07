angular.module('resthitter').controller('ListController', ['Name', function(Name){
  var lc = this;
  lc.names = Name.query(function(){
    console.log("getNames");
  });

  

}]);
