 //TODO: FILTRATION BEFORE SENDING BACK EVENTS

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

 app.get('/app-bundle.js',
    browserify('./client/components/App.jsx', {
    transform: [ [ require('babelify'), { presets: ["es2015", "react"] } ] ]
  })
  )

 app.get('/', function(req,res){
   //browserify(path.join(__dirname, '..', '/client/index.js'))
    res.send(path.join(__dirname, '../client/index.html'));
   });



 app.get('/facebookLogin', function(req, res){
    res.sendFile(path.join(__dirname, '../client/facebookLogin.html'));
 });

 app.get('/events', function(req,res){
  var now = new Date().toISOString().slice(0, 19).replace('T', ' ');
  var fourtyEightHours = new Date(+new Date + 1.728e8).toISOString().slice(0, 19).replace('T', ' ');

    knex.select('*').from('events').where('end_time', '>', now).andWhere('end_time', '<', fourtyEightHours)
    .then(function(data){
        res.json(data);
      }).catch(function(err){
        console.log(err);
      });
  });

 app.post("/user/login", function(req, res) {
  var now = new Date().toISOString().slice(0, 19).replace('T', ' ');
  var fourtyEightHours = new Date(+new Date + 1.728e8).toISOString().slice(0, 19).replace('T', ' ');
  // var friends = req.body.friends.map( (friend) => friend.id)
  // console.log(req.body);
  var result = {}
   knex.select('*').from('users').where('id', req.body.id)
   .then(function(data){
    // console.log('hello data', data.length)
    if(data.length === 0){
      // console.log(req.body);
      knex.insert(req.body).into('users')
      .then( console.log('new user added!') )
      }
   })
   .then(function(){
    knex.select('*').from('events').where('end_time', '>', now).andWhere('end_time', '<', fourtyEightHours)
   .then(function(data){
    result.allevents = data;
    result.events_created = data.filter(function(x){return x.creator_id === req.body.id})
                                .map(function(y){return y.id});
    knex.select('event_id').from('events_users').where('user_id', req.body.id)
    .then(function(events_attending){
      result.events_attending = events_attending;
      res.json(result);
      })
    })
  })
});

app.post("/events/rsvp", function(req, res) {
  //takes request body
  //{user_id: 1234, event_id:6789}
  knex.insert(req.body).into('events_users')
  .then(res.send('rsvped to event'))
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
  .then(res.send('unrsvped to event'))
  });

app.post("/events/update", function(req, res){
  console.log("request body", req.body);
  knex('events').where('id', req.body.id).update(req.body)
  .then(res.send('updated event'))
  });

 app.post("/events/new", function(req, res) {
  //will send back event id
  knex.insert(req.body).into('events').returning('id')
  .then(function(data){
    // console.log('new row', data);
    // res.json(data);
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
