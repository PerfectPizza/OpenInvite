//TODO: FILTRATION BEFORE SENDING BACK EVENTS
var express = require('express');
var app = express();
var browserify = require('browserify-middleware');
var path = require('path');
var bodyParser = require('body-parser')
require('dotenv').config()

// Still need a database conneciton
var knex = require('knex')({
  client: 'mysql',
  connection: process.env.JAWSDB_URL
});

// code from the express.static docs
app.use(express.static(path.join(__dirname, '/../client/')))
app.use(bodyParser.json());

 app.get('/app-bundle.js',
    browserify('./client/App.jsx', {
    transform: [ [ require('babelify'), { presets: ["es2015", "react"] } ] ]
  })
  )

 app.get('/', function(req,res){
    res.redirect('/facebookLogin');
   });

 app.get('/facebookLogin', function(req, res){
    res.sendFile(path.join(__dirname, '../client/facebookLogin.html'));
 });

 app.post("/user/login", function(req, res) {
  //{id: , name: , photo: , email:}
   knex.select('*').from('users').where('id', req.body.id)
   .then(function(data){
    // console.log('hello data', data.length)
    if(data.length === 0){
      console.log(req.body);
      knex.insert(req.body.user).into('users')
      .then( )
      }
   })
   .then(retreiveAll(req.body.id,res))
});

//
app.post("/events/rsvp", function(req, res) {
  //takes request body
  //{user_id: 1234, event_id:6789}
  knex.insert(req.body).into('events_users')
  .then(retreiveAll(req.body.user_id, res))
  });

app.post("/events/attendance", function(req, res) {
  //takes request body
  //{event_id: 6789}
  knex.select('*').from('events_users').where(req.body)
  .then(function(attendees){res.json(attendees)})
  });

app.post("/events/unrsvp", function(req, res) {
  //takes request body
  //{user_id: 1234, event_id:}
  knex('events_users').where(req.body).del()
  .then(retreiveAll(req.body.user_id, res))
  });

app.post("/events/update", function(req, res){
  //{user_id: , event: {}}
  console.log("request body", req.body);
  knex('events').where('id', req.body.event.id).update(req.body.event)
  .then(retreiveAll(req.body.user_id, res))
  });

 app.post("/events/new", function(req, res) {
   console.log(req.body);
  //{user_id:  , event: {}}
  knex.insert(req.body.event).into('events')
  .then(retreiveAll(req.body.user_id, res))
  });

 app.post("/events/remove", function(req, res) {
  // {event_id: , user_id:}
  knex('events').where('id', req.body.event_id).del()
  .then(retreiveAll(req.body.user_id))
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

var retreiveAll = function(userid, res){
    var result = {};
    var now = new Date(+new Date -2.16e+7).toISOString().slice(0, 19).replace('T', ' ');
    var fourtyEightHours = new Date(+new Date + 1.728e8 -2.16e+7).toISOString().slice(0, 19).replace('T', ' ');
    knex.select('*').from('events').where('end_time', '>', now).andWhere('end_time', '<', fourtyEightHours).orderBy('created_at', 'desc')
    .then(function(data){
      console.log("result from query", data)
    result.allevents = data;
    result.events_created = data.filter(function(x){return x.creator_id === userid ;})
                                .map(function(y){return y.id});
    knex.select('event_id').from('events_users').where('user_id', userid)
    .then(function(events_attending){
      result.events_attending = events_attending;
      res.json(result);
      })
    })
  }