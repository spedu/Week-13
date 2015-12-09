var express = require('express');

var app = express();

app.use(function(req, res, next){
  console.log((new Date()).toString() + " " + req.method + " " + req.url);
  next();
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var people = [
  {id: 1, name: "Steve", twitter: "@steveyeun"},
  {id: 2, name: "Norman", twitter: "@wwwbigbaldhead"},
  {id: 3, name: "Lauren", twitter: "@LaurenCohan"},
  {id: 4, name: "Danai", twitter: "@DanaiGurira"}
];

app.get('/people', function(req, res){
  res.json(people);
});

app.get('/people/:id', function(req, res){
  // id = req.params.id
  var counter = 0;
  people.forEach(function(person){
    setTimeout(function(){
      if(person.id == req.params.id){
        res.json(person);
      }
      counter++;
      if(counter == people.length){
        // then we've gone through them all and it wasn't found
        res.status(404).end();
      }
    }, 10);
  });
});

app.listen(7000);
