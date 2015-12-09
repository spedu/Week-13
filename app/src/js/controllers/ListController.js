angular.module('resthitter').controller('ListController', ['People', function(People){
  var lc = this;
  lc.people = [
    {id: 1, name: "Steve", twitter: "@steveyeun"},
    {id: 2, name: "Norman", twitter: "@wwwbigbaldhead"},
    {id: 3, name: "Lauren", twitter: "@LaurenCohan"},
    {id: 4, name: "Danai", twitter: "@DanaiGurira"}
  ];
  lc.people = People.query();

  lc.delete = function(id){
    People.delete({id: id}, function(){
      lc.people = People.query();
    });
  };

}]);
