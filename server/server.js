var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var people = [
  {id: 1, name: "Steve", twitter: "@steveyeun"},
  {id: 2, name: "Norman", twitter: "@wwwbigbaldhead"},
  {id: 3, name: "Lauren", twitter: "@LaurenCohan"},
  {id: 4, name: "Danai", twitter: "@DanaiGurira"}
];


app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  next();
});

app.use(function(req, res, next) {
  console.log((new Date()).toString() + ' ' + req.method + ' ' + req.url);
  next();
});

app.get('/people', function(req, res) {
  res.json(people);
});

app.get('/people/:id', function(req, res) {
  people.forEach(function(person) {
    if(person.id == req.params.id) {
      res.json(person);
    }
  });

  res.status(404).end();
});

app.post('/people', function(req, res) {
  var postedPerson = req.body;

  if(postedPerson.id === undefined) {
    postedPerson.id = people.length + 1;
    people.push(postedPerson);
    res.end();
  }

  people.forEach(function(person, index) {
    if(person.id == postedPerson.id) {
      people[index] = postedPerson;
      res.end();
    }
  });

  res.status(404).end();
});

app.delete('/people/:id', function(req, res) {
  people.forEach(function(person, index) {
    if(req.params.id == person.id) {
      people.splice(index);
      res.end();
    }
  });
  res.status(404).end();
});

app.listen(7000);