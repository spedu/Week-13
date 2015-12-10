angular.module('resthitter').controller('ListController', ['People', function(People){
  var lc = this;
  lc.people = People.query();

  lc.delete = function(id) {
    People.delete({id: id}, function() {
      lc.people = People.query();
    });
  };
}]);
