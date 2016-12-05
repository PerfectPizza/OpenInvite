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

  var now = new Date().toISOString().slice(0, 19).replace('T', ' ');
  var fourtyEightHours = new Date(+new Date + 1.728e8).toISOString().slice(0, 19).replace('T', ' ');

   knex.select('*').from('users').where('id', req.body.id)
   .then(function(data){
    console.log('hello data', data.length)
    if(data.length === 0){
      knex.insert(req.body).into('users').then(console.log('new user added!'))
      }
   })
   .then(function(){
    knex.select('*').from('events').where('end_time', '>', now).andWhere('end_time', '<', fourtyEightHours)
    .then(function(data){
      res.json(data);}
      )})
  });

 
// app.post("/events/rsvp", function(req, res) {
//   knex.insert(req.body).into('events_users')
//   .then(res.send('rsvped to event'))
//   });

// app.post("/events/attendance", function(req, res) {
//   knex.select('*').from('events_users').where('event_id', req.body)
//   .then(res.send('rsvped to event'))
//   });

// app.post("/events/unrsvp", function(req, res) {
//   knex('events_users').where(req.body).del()
//   .then(res.send('rsvped to event'))
//   }); 
 
app.post("/events/update", function(req, res){
  console.log("request body", req.body);
  knex('events').where('id', req.body.id).update(req.body)
  .then(res.send('updated event'))
  });

 app.post("/events/new", function(req, res) {
  //will send back new object with event id
  knex.insert(req.body).into('events').returning('id')
  .then(function(data){
    console.log('new row', data);
    res.json(data);
    })

  });

 app.post("/events/remove", function(req, res) {
  knex('events').where('id', req.body.id).del()
  .then(res.send('deleted event!'))
  });

  // app.get("/events", function(req, res) {
  	
  // var now = new Date().toISOString().slice(0, 19).replace('T', ' ');
  // var fourtyEightHours = new Date(+new Date + 1.728e8).toISOString().slice(0, 19).replace('T', ' ');

  //  knex.select('*').from('events').where('end_time', '>', now).andWhere('end_time', '<', fourtyEightHours)
  //   .then(function(data){
  //     res.json(data);})
  //  // TODO new query to events_users to find everyone attending event 
  // });

 var port = process.env.PORT || 5000;
 app.listen(port, function() {
   console.log("Listening on " + port);
 });
