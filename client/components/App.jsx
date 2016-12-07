window.markers = []

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      events: window.userEvents,
      users: window.users,

    }
  }

  updateApp(eventsArr) {
    this.setState({events:eventsArr});
  }

  render(){
    return (
      <div>
      {/* this a boostrap layout for the page */}
        <ReactBootstrap.Grid fluid>
          {/* A row for the map and events*/}
          <ReactBootstrap.Row className="show-grid">
            {/* The column where the google map is located*/}
            <ReactBootstrap.Col md={8}>
              <Map key="MAP" />
            </ReactBootstrap.Col>
            {/* The column where the events are located*/}
            <ReactBootstrap.Col md={4}>
              <EventList key="Events" updateApp={this.updateApp.bind(this)} users={this.state.users} events={this.state.events} />
            </ReactBootstrap.Col>
          </ReactBootstrap.Row>
        </ReactBootstrap.Grid>
      </div>
    )
  }

}

class Map extends React.Component {
  constructor (props) {
    super()
    this.state = {
    }
  }

  componentDidMount () {

      var myLatlng = new google.maps.LatLng(30.256729, -97.739650);
      var mapOptions = {
            zoom: 14,
            center: myLatlng
        }
        window.map = new google.maps.Map(document.getElementById('map'), mapOptions)
}

  render() {
    return (
      <div>
        <div style={{width: "66vw", height: "80vh"}} id="map"></div>
      </div>
    )
  }
}


function EventList (props) {
var attendance;
    return (
      <div className="eventlist">
      <CreateEventForm />
        {
          props.events.allevents.map(function(event){
            //Order matters here so that only one of the three attendance states is reached:
            //1) check if the current user is the creator of the event.
            //2) check if the current user is a friend of the creator of the event.
            //3) Finally, check if the current user is attending the event, which is only
            //possible if the user is a friend of the event creator
            if(event.creator_id === window.user.id){
              attendance = "creator";
            }
            else {
              window.user.friends.data.forEach(function(friend){
                if(event.creator_id === friend.id){
                  attendance = "friend"
                }
              })
              window.userEvents.forEach(function(eventID){
                if(eventID === event.id){
                  attendance = "attendee"
                }
              })
            }

            return (
              <Event updateApp={props.updateApp} users={props.users} event={event} attendance={attendance} />
            )

            })
        }
      </div>
    )
}

class Event extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      creator: window.friends[props.event.creator_id] || window.user.name,
      id: props.event.id,
      description: props.event.description,
      startTime: props.event.start_time,
      endTime: props.event.end_time,
      latitude: Number(props.event.latitude),
      longitude: Number(props.event.longitude),
      users: window.users,
      marker: null,
      attendance: props.attendance,
    }
  }

componentDidMount () {
  //set current event's gps coordinates
  var gpsCoords = new google.maps.LatLng(this.state.latitude, this.state.longitude);

    //set marker state to a new Google Maps Marker (pin)
    var marker = new google.maps.Marker({
        id: this.state.id,
        position: gpsCoords,
        title: this.state.description,
        map: window.map
    })


    window.markers.push(marker)
    this.setState({marker: marker})

    $('div #' + this.state.id).on('click', function() {
          for(let marker of window.markers){marker.setAnimation(null)}

          marker.setAnimation(google.maps.Animation.BOUNCE)

          map.setCenter(marker.getPosition())

          $('.event').removeClass('activeEvent');
          $('#' + this.id).addClass('activeEvent');

      })

}

  configureTimes(){
      var start = this.state.startTime;
      var end = this.state.endTime;
          function newTime (time){
            var hour = time.slice(11,13)
            var minutes = time.slice(14,16)
            var year = time.slice(0,4)
            var month = time.slice(5,7)
            var day = time.slice(8,10)
            var amPM;
            if(Number(hour) < 12){
              amPM = "AM"
            }else{
              amPM = "PM"
            }
            var compiledTime = "Date: " + month + "/" + day +"/" + year + "   Time: " + hour + ":" +minutes " " + amPM 
            return compiledTime
          }    
          this.setState({ startTime: newTime(this.state.startTime)});
          this.setState({ endTime: newTime(this.state.endTime)}); 
    }
  render() {

    //if marker is already set to the state, then add click listener
    if(this.state.marker) {
      this.state.marker.addListener('click', function() {
        //link each pin to its corresponding Event in the EventList
        window.location.href = window.location.href.split('#')[0] + '#' + this.id;
        //reset activeEvent class assignments
        $('.event').removeClass('activeEvent');
        //change background color of selected event
        $('#' + this.id).addClass('activeEvent');
      })
    }
    //need to pass in user prop
    configureTimes();

    return (

      <div className="event" id={this.state.id}>
       <div className="event" id={this.state.id}>
        <p className="attendance">attendance: {this.state.attendance}</p>
        <p className="eventText">Host: {this.state.creator}</p>
        <p className="eventText">Start Time: {this.state.startTime}  End Time: {this.state.endTime}</p>
        <p className="eventText">Description: {this.state.description}</p>
        </div>
        <EventAttendanceForm creator={this.state.creator} event={this.state.description} user={this.state.user} eventId={this.props.id} />
      </div>
    )
  }
}

const CreateEventForm = React.createClass({
  getInitialState() {
    return { showModal: false };
  },

  componentDidUpdate () {
      // -------------------------   Create Event Map ------------------------------------
      var latLong = new google.maps.LatLng(30.256729, -97.739650);
      var mapOptions = {
            zoom: 10,
            center: latLong
        }

      var map = new google.maps.Map(document.getElementById('createEventMap'), mapOptions)

     // ------------------------------  Searchbar   --------------------------------------


      // Create the search box and link it to the UI element.
       var input = document.getElementById('pac-input2');

        var autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.bindTo('bounds', map);

        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        var infowindow = new google.maps.InfoWindow();
        var marker = new google.maps.Marker({
          map: map
        });

        autocomplete.addListener('place_changed', function() {
          $('.pac-container').show()
          infowindow.close();
          var place = autocomplete.getPlace();
          if (!place.geometry) {
            return;
          }
          $('.pac-container').hide()
            map.setCenter(place.geometry.location);
            map.setZoom(13);

          // Set the position of the marker using the place ID and location.
          marker.setPlace({
            placeId: place.place_id,
            location: place.geometry.location
          });
          marker.setVisible(true);

          //Access data on selected location and put in on the window
          window.place = {
            name: place.name,
            latitude: place.geometry.location.lat(),
            longitude: place.geometry.location.lng(),
            address: place.formatted_address
          }
        });
},

  close() {
    this.setState({ showModal: false });
    $('.pac-container').hide()
  },

  open() {
    this.setState({ showModal: true });
    $('.pac-container').hide()
  },

  closeAndPost() {
    this.setState({ showModal: false});
    var $form = $('#createEventForm')
    var eventObj = {
      address: window.place.address,
      latitude: window.place.latitude.toString(),
      longitude: window.place.longitude.toString(),
      location_name: window.place.name,
      start_time: $form.find('input[name="start_time"]').val(),
      end_time: $form.find('input[name="end_time"]').val(),
      creator_id: window.user.id,
      description: $form.find('textarea[name="description"]').val(),
      title: $form.find('input[name="title"]').val(),
      cap: $form.find('input[name="cap"]').val(),
    };
    $.ajax({
      type: "POST",
      url: 'events/new',
      data: JSON.stringify({user_id: window.user.id,event: eventObj}),
      contentType: 'application/json',
      success: function(postResponse){
        console.log(postResponse);
      },
    });
  },

  render() {
    return (
      <div>
        <ReactBootstrap.Button md={4}
          bsStyle="primary btn-block"
          bsSize="large"
          onClick={this.open}
        >
          Create New Human
        </ReactBootstrap.Button>
        <ReactBootstrap.Modal
          show={this.state.showModal}
          onHide={this.close}
          aria-labelledby="ModalHeader"
        >
          <ReactBootstrap.Modal.Header closeButton>
            <ReactBootstrap.Modal.Title id='ModalHeader'></ReactBootstrap.Modal.Title>
          </ReactBootstrap.Modal.Header>
          <ReactBootstrap.Modal.Body>

            <div className="createEventFormDiv">

            <form class="form-horizontal" id="createEventForm" method="post" role="form"action="/events/new">

            <div class="form-group">
              <label for="name" class="cols-sm-2 control-label">Event Title</label>
              <div class="cols-sm-10">
                  <input type="text" class="form-control" name="title" id="eventTitle"  placeholder="what's it called"/>
              </div>
            </div>

            <div class="form-group">
              <label for="description" class="cols-sm-2 control-label">Event Description</label>
              <div class="cols-sm-10">
                  <textarea class="form-control" name="description" id="description"  placeholder="what's happening"/>
              </div>
            </div>

            <div class="form-group">
              <label for="description" class="cols-sm-2 control-label">Start Time</label>
              <div class="cols-sm-10">
                  <span class="input-group-addon"><i class="fa fa-user fa" aria-hidden="true"></i></span>
                  <input type="datetime-local" class="form-control" name="start_time" id="startTime"  placeholder="what's happening"/>
              </div>
            </div>

            <div class="form-group">
              <label for="description" class="cols-sm-2 control-label">End Time</label>
              <div class="cols-sm-10">
                  <span class="input-group-addon"><i class="fa fa-user fa" aria-hidden="true"></i></span>
                  <input type="datetime-local" class="form-control" name="end_time" id="endTime"  placeholder="what's happening" max={/*48 hours from now: */new Date(+new Date + 1.728e8).toISOString().slice(0, 19).replace('T', ' ').split(' ')[0]}/>
                </div>
            </div>

            <div class="form-group">
              <label for="location" class="cols-sm-2 control-label">Event Size</label>
              <div class="cols-sm-1">
                  <input type="number" name="cap" id="cap"/>
                </div>
            </div>

            <div class="form-group">
              <label for="location" class="cols-sm-2 control-label">Location</label>
              <div class="cols-sm-10">
                  <input type="text" id="pac-input2" placeholder="Holiday Inn" autocomplete="on" style={{display: "block"}}/>
                  <div class="col-sm-10" style={{width: "46vw", height: "40vh"}} id="createEventMap"></div>
                </div>
            </div>


           <div class="form-group">
              <div class="col-sm-offset-2 col-sm-10">
              <ReactBootstrap.Button md={4}
                  bsStyle="primary btn-block"
                  bsSize="large"
                  onClick={this.closeAndPost}
                >Create Your Human</ReactBootstrap.Button>
              </div>
            </div>

          </form>
          </div>
          </ReactBootstrap.Modal.Body>
        </ReactBootstrap.Modal>
      </div>
    )
  }
})


const EventAttendanceForm = React.createClass({
  getInitialState() {
    //axios.get('/events/attendants', function(friends){
      return { showModal: false,
             attending: false,
             eventOwner: this.props.creator,
             attendingFriends: null,//array of the friends who are attending,
             eventDescription: this.props.event,//name of event or some sort of evidence of what the event is
             eventId: this.props.eventId,
             user: window.user
           }
   // })

  },

  attendChange(){
    this.setState({attending: !(this.state.attending)})

  },

  handleSubmit(e){
    e.preventDefault()
    this.setState({attending: !(this.state.attending)})
    var reqType;
    var reqData = {
        eventId: this.state.eventId,
        user: this.state.user,
        attending: this.state.attending}
    if(this.state.attending === false){
            return axios.post('/events/attendants', reqData)
                  .then(function (response) {
        console.log("You are now attending", response);
      })
    } else {
           return axios.delete('/events/attendants', reqData)
                  .then(function (response) {
        console.log("You are now attending", response);
      })
    }
      // $.ajax({
      //   type: reqType,
      //   url: '/events/attendants',
      //   data: reqData,
      //   dataType:  'application/json'
      //   }).done(function (response) {
      //   console.log("You are now attending", response);
      // })
      return axios.delete('/events/attendants', reqData)
                  .then(function (response) {
        console.log("You are now attending", response);
      })
  },

  close() {
    console.log(this.state.attending);
    this.setState({attending: !(this.state.attending)})
    console.log(this.state.attending);
    this.setState({ showModal: false });
    $('.pac-container').hide()
  },

  open() {
    this.setState({ showModal: true });
    $('.pac-container').hide()
  },

  render() {
    var dummyFriends = ['Friend 1', 'Friend 2', 'Friend 3', 'Friend 4', 'Friend 5']
    if(this.state.attending === false){
          return (


      <div>
        <ReactBootstrap.Button md={4}
          bsStyle="primary btn-block"
          bsSize="large"
          onClick={this.open}
        >
          Attend Event
        </ReactBootstrap.Button>
        <ReactBootstrap.Modal
          show={this.state.showModal}
          onHide={this.close}
          aria-labelledby="ModalHeader"
        >
          <ReactBootstrap.Modal.Header closeButton>
            <ReactBootstrap.Modal.Title id='ModalHeader'></ReactBootstrap.Modal.Title>
          </ReactBootstrap.Modal.Header>
          <ReactBootstrap.Modal.Body>

            <div className="attendThisEventDiv">

            <form class="form-horizontal" onSubmit={this.handleSubmit} id="attendThisEventForm"  role="form">

            <div class="eventOwnerDiv">
              Host: {this.state.eventOwner}
            </div>
            <div class="eventNameDiv">
              Event: {this.state.eventDescription}
            </div>


            <div class="attendingFriendList">
              <label for="name" class="cols-sm-2 control-label">Friends Who Are Going</label>
              <div class="cols-sm-10">

                  <div>
                    {dummyFriends.map(function(friend){
                      //this.state.attending.map()
                      return <div>{friend}</div>
                    })
                   }
                  </div>
              </div>
            </div>


            <div class="form-group">
              <div class="col-sm-offset-2 col-sm-10">
              <ReactBootstrap.Button md={4}
                  bsStyle="primary btn-block"
                  bsSize="large"
                  type="submit"
                  onClick={this.close}
                >Attend Event
              </ReactBootstrap.Button>
              </div>
            </div>

          </form>
          </div>
          </ReactBootstrap.Modal.Body>
        </ReactBootstrap.Modal>
      </div>
    )



  } else {

              return (


      <div>
        <ReactBootstrap.Button md={4}
          bsStyle="primary btn-block"
          bsSize="large"
          onClick={this.open}
        >
          Going!
        </ReactBootstrap.Button>
        <ReactBootstrap.Modal
          show={this.state.showModal}
          onHide={this.close}
          aria-labelledby="ModalHeader"
        >
          <ReactBootstrap.Modal.Header closeButton>
            <ReactBootstrap.Modal.Title id='ModalHeader'></ReactBootstrap.Modal.Title>
          </ReactBootstrap.Modal.Header>
          <ReactBootstrap.Modal.Body>

            <div className="attendThisEventDiv">

            <form class="form-horizontal" onSubmit={this.handleSubmit} id="attendThisEventForm"  role="form" >


            <div class="eventOwnerDiv">
              Host: {this.state.eventOwner}
            </div>
            <div class="eventNameDiv">
              Event: {this.state.eventDescription}
            </div>


            <div class="attendingFriendList">
              <label for="name" class="cols-sm-2 control-label">Friends Who Are Going</label>
              <div class="cols-sm-10">

                  <div>
                    {dummyFriends.map(function(friend){
                      return <div>{friend}</div>
                    })
                   }
                  </div>
              </div>
            </div>

            <div class="form-group">
              <div class="col-sm-offset-2 col-sm-10">
              <ReactBootstrap.Button md={4}
                  bsStyle="primary btn-block"
                  bsSize="large"
                  type="submit"
                  onClick={this.close}
                >Can't Make It
              </ReactBootstrap.Button>
              </div>
            </div>

          </form>
          </div>
          </ReactBootstrap.Modal.Body>
        </ReactBootstrap.Modal>
      </div>
    )

//Owner Edit form


    // return (
    //   <div>
    //     <ReactBootstrap.Button md={4}
    //       bsStyle="primary btn-block"
    //       bsSize="large"
    //       onClick={this.open}
    //     >
    //       Edit Event
    //     </ReactBootstrap.Button>
    //     <ReactBootstrap.Modal
    //       show={this.state.showModal}
    //       onHide={this.close}
    //       aria-labelledby="ModalHeader"
    //     >
    //       <ReactBootstrap.Modal.Header closeButton>
    //         <ReactBootstrap.Modal.Title id='ModalHeader'></ReactBootstrap.Modal.Title>
    //       </ReactBootstrap.Modal.Header>
    //       <ReactBootstrap.Modal.Body>

    //         <div className="editFormDiv">
    //                                                   //THIS IS A PUT AND A DELETE FORM   //CHANGE THE ACTION TO THE CORRECT ROUTE
    //         <form class="form-horizontal" id="editEventForm" method="put" role="form" action="/events/new">



    //         <div class="eventNameDiv">
    //           Event: {this.state.eventName}
    //         </div>


    //         <div class="form-group">
    //           <label for="name" class="cols-sm-2 control-label">Friends Who Are Going</label>
    //           <div class="cols-sm-10">
    //               <input type="text" class="form-control" name="friendsAttending" id="friendsAttending"  placeholder="list of people who are going"/>
    //               <div>
    //                 {dummyFriends.map(function(friend){
    //                   return <div>{friend}</div>
    //                 })
    //                }
    //               </div>
    //           </div>
    //         </div>

    //        <div class="form-group">
    //           <div class="col-sm-offset-2 col-sm-10">
    //           <ReactBootstrap.Button md={4}
    //               bsStyle="primary btn-block"
    //               bsSize="large"
    //               onClick={this.editForm}
    //             >Edit Event</ReactBootstrap.Button>
    //           </div>
    //         </div>

    //         <div class="form-group">
    //           <div class="col-sm-offset-2 col-sm-10">
    //           <ReactBootstrap.Button md={4}
    //               bsStyle="primary btn-block"
    //               bsSize="large"
    //               onClick={this.cancelEvent()}
    //             >Cancel Event</ReactBootstrap.Button>
    //           </div>
    //         </div>

    //       </form>
    //       </div>
    //       </ReactBootstrap.Modal.Body>
    //     </ReactBootstrap.Modal>
    //   </div>
    // )












  }

  }
})

ReactDOM.render(<App key="MainApp"/>, document.getElementById('app'))
