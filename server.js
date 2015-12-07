var express = require('express');
//var bodyparser = require('')
var app = express();

var names = [
  {id:1, name:"qwer", description: "qwerqwerqwerqwerqwerqewrqewr"},
  {id:2, name:"asdf", description: "asdfasdfasdfasdfasdfasdfasdf"},
  {id:3, name:"zxcv", description: "zxcvzxcvzxcvzxcvzxcvzxcvzxcv"}
];

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(function(req, res, next) {
  var date = new Date();
  console.log(date + " " + res.statusCode + " " + req.method + " " + req.url);
  next();
});

app.get('/names', function(req, res){
  console.log("getting /names");
  //res.send("hello");

  res.json(names);

});

app.get('/names/:id', function(req, res){
  console.log("getting /names/" + req.params.id);
  names.forEach(function(name){
    if(name.id == req.params.id){
      console.log(name);
      res.json(name);
    }
  });
  //res.status(404).json({error: "not found"});
});




app.listen(7000);
