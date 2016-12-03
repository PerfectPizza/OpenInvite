 var express = require('express');
 var browserify = require('browserify-middleware');
 var path = require('path');
 var app = express();

var knexfile = require('../knexfile.js');
//knexfile();
// Serves up a browserified version of our index, with access to any of it's dependencies
// ...in theory

// Still need a database conneciton
var knex = require('knex')(knexfile);

 app.get('/', function(req,res){
   //browserify(path.join(__dirname, '..', '/client/index.js'))
   console.log("this route got hit.")
    res.sendFile(path.join(__dirname, '../client/index.html'));
   });

 app.get('/facebookLogin', function(req, res){
   console.log("this route got hit.")
    res.sendFile(path.join(__dirname, '../client/facebookLogin.html'));
 })

 app.post("/events/new", function(req, res) {
 	//knex insert into table events new
 	//res.send back list of
  });

  app.post("/events", function(req, res) {
  	// unsure if this should be a get or a post request?
  	// req.body to find out relevent information about user
  	// -- ex) radius of user
	// res.send back list of relevent events
  });

 var port = process.env.PORT || 5000;
 app.listen(port, function() {
   console.log("Listening on " + port);
 });
