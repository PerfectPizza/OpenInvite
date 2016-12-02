 var express = require('express');
 var browserify = require('browserify-middleware');
 var path = require('path')
 var app = express();



// Serves up a browserified version of our index, with access to any of it's dependencies 
// ...in theory

// Still need a database conneciton 


 app.get('/', browserify(path.join(__dirname, '..', '/client/index.js'));

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