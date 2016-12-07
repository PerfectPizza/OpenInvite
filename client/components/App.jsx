window.markers = []

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      events: window.events,
      users: window.users
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

    return (
      <div className="eventlist">
      <CreateEventForm />
        {
          props.events.map(function(event){
            return (
              <Event updateApp={props.updateApp} users={props.users} event={event} />
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
      creator: props.event.creator,
      id: props.event.id,
      description: props.event.description,
      startTime: props.event.startTime,
      endTime: props.event.endTime,
      latitude: props.event.lat,
      longitude: props.event.long,
      users: props.users,
      marker: null
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


=======
  })
      
}


>>>>>>> Markers rendering and marker click handler linked to corresponding Event in EventList

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
<<<<<<< HEAD
<<<<<<< HEAD



=======
>>>>>>> Markers rendering and marker click handler linked to corresponding Event in EventList
=======
>>>>>>> Fix pin bounce / Add updateApp function
    }

    return (
      <div className="event" id={this.state.id}>
        <p className="eventText">Host: {this.state.users[this.state.creator].name}</p>
        <p className="eventText">Start Time: {this.state.startTime}  End Time: {this.state.endTime}</p>
        <p className="eventText">Description: {this.state.description}</p>
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
      address: $form.find('input[name="address"]').val(), //this is undefined
      latitude: window.place.latitude,
      longitude: window.place.longitude,
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
      data: JSON.stringify(eventObj),
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

ReactDOM.render(<App key="MainApp"/>, document.getElementById('app'))
