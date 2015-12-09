var express = require('express');

var app = express();

var people = [
  {id: 1, name: "Steve", twitter: "@steveyeun"},
  {id: 2, name: "Norman", twitter: "@wwwbigbaldhead"},
  {id: 3, name: "Lauren", twitter: "@LaurenCohan"},
  {id: 4, name: "Danai", twitter: "@DanaiGurira"}
];

app.get('/', function(req, res){
  res.send(people);
});

app.listen(7000);
