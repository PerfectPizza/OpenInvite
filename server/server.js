 var express = require('express');
 var browserify = require('browserify-middleware');
 var path = require('path');
 var app = express();
 var bodyParser = require('body-parser')
 var connection = require('../knexfile.js');
//knexfile();
// Serves up a browserified version of our index, with access to any of it's dependencies
// ...in theory

// Still need a database conneciton
var knex = require('knex')({
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: '',
      database: 'db',
      charset: 'utf8'
    }});


// code from the express.static docs
app.use(express.static(path.join(__dirname, '/../client/')))
app.use (bodyParser.json());

 app.get('/', function(req,res){
   //browserify(path.join(__dirname, '..', '/client/index.js'))
   console.log("this route got hit.")
    res.send(path.join(__dirname, '../client/index.html'));
   });

 app.get('/facebookLogin', function(req, res){
   console.log("this route got hit.")
    res.sendFile(path.join(__dirname, '../client/facebookLogin.html'));
 })

 app.post("/user/login", function(req, res) {
   // console.log('request.body',req.body)
   knex.select('*').from('users').where('id', req.body.id)
   .then(function(data){
    if(data.length > 0){
      knex.insert(req.body).into('users')
      res.send('Welcome to open invite')
    }
    else{
      res.send('Welcome back')
    }
   })
  });

 
 //app.post attend event 
 //app.post get all event attendees 
 //app.post remove user from event attendance 
 //app.post update event
 //
 app.post("/events/new", function(req, res) {
 	//knex insert into table events new
 	//res.send back list of
  });

  app.get("/events", function(req, res) {
  	// knex.select('*').from('events').where('start_time', '>=',)
   //  .then(function(){res.send('hello')})
   var now = new Date().toISOString().slice(0, 19).replace('T', ' ');
   var fourtyEightHours = new Date(+new Date + 12096e5).toISOString().slice(0, 19).replace('T', ' ');
   //select all from events where endtime > now and endtime < fourtyeighthours
   // new query to events_users to find everyone attending event 
  });

 var port = process.env.PORT || 5000;
 app.listen(port, function() {
   console.log("Listening on " + port);
 });
