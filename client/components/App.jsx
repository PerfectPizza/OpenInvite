window.marker = {}

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      events: window.events,
      users: window.users,
      map: null
    }
  }

  render(){
    return (
      <div>
      <NavBar key={'navbar'}/>
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
              <EventList key="Events" users={this.state.users} events={this.state.events} />
            </ReactBootstrap.Col>
          </ReactBootstrap.Row>
        </ReactBootstrap.Grid>
      </div>
    )
  }

}

function NavBar () {
  return (
    <div>
      <ReactBootstrap.Nav bsStyle="pills" justified>
        <ReactBootstrap.NavItem eventKey={1}>NavItem 1 content</ReactBootstrap.NavItem>
        <ReactBootstrap.NavItem eventKey={2}>NavItem 2 content</ReactBootstrap.NavItem>
        <ReactBootstrap.NavItem eventKey={3}>NavItem 3 content</ReactBootstrap.NavItem>
      </ReactBootstrap.Nav>
    </div>
  )
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
        // map = window.map

// ---------------------- BEGIN AUTOCOMPLETE SEARCHBAR TEST ------------------------------------------


      // // Create the search box and link it to the UI element.
      //  var input = document.getElementById('pac-input');

      //   var autocomplete = new google.maps.places.Autocomplete(input);
      //   autocomplete.bindTo('bounds', map);

      //   map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

      //   var infowindow = new google.maps.InfoWindow();
      //   var marker = new google.maps.Marker({
      //     map: map
      //   });
      //   marker.addListener('click', function() {
      //     infowindow.open(map, marker);
      //   });

      //   autocomplete.addListener('place_changed', function() {
      //     infowindow.close();
      //     var place = autocomplete.getPlace();
      //     if (!place.geometry) {
      //       return;
      //     }

      //     if (place.geometry.viewport) {
      //       map.fitBounds(place.geometry.viewport);
      //     } else {
      //       map.setCenter(place.geometry.location);
      //       map.setZoom(17);
      //     }

      //     // Set the position of the marker using the place ID and location.
      //     marker.setPlace({
      //       placeId: place.place_id,
      //       location: place.geometry.location
      //     });
      //     marker.setVisible(true);

      //     //Access data on selected location
      //     console.log("Place Name:", place.name)
      //     console.log("PLACE ID:", place.place_id)
      //     console.log("Place Location:", place.geometry.location)
      //     console.log("Place Latitude:", place.geometry.location.lat())
      //     console.log("Place Longitude:", place.geometry.location.lng())
      //     console.log("Formatted Address:", place.formatted_address)

      //   });

// ---------------------- END SEARCHBAR AUTOCOMPLETE TEST --------------------------------------

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
              <Event users={props.users} event={event} />
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

    this.setState({marker: marker})

    $('div #' + this.state.id).on('click', function() {
        console.log("THIS IS CLICKED", this)
          console.log("Marker? ", marker)
          marker.setAnimation(google.maps.Animation.BOUNCE)

          map.setCenter(marker.getPosition())

          $('.event').removeClass('activeEvent');
          $('#' + this.id).addClass('activeEvent');

      })

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

      var latLong = new google.maps.LatLng(30.256729, -97.739650);
      var mapOptions = {
            zoom: 10,
            center: latLong
        }


      var map = new google.maps.Map(document.getElementById('createEventMap'), mapOptions)

// ---------------------- BEGIN AUTOCOMPLETE SEARCHBAR ------------------------------------------


      // Create the search box and link it to the UI element.
       var input = document.getElementById('pac-input2');

        var autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.bindTo('bounds', map);

        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        var infowindow = new google.maps.InfoWindow();
        var marker = new google.maps.Marker({
          map: map
        });
        marker.addListener('click', function() {
          infowindow.open(map, marker);
        });

        autocomplete.addListener('place_changed', function() {
          infowindow.close();
          var place = autocomplete.getPlace();
          if (!place.geometry) {
            return;
          }

          if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
          } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
          }

          // Set the position of the marker using the place ID and location.
          marker.setPlace({
            placeId: place.place_id,
            location: place.geometry.location
          });
          marker.setVisible(true);

          //Access data on selected location
          console.log("Place Name:", place.name)
          console.log("PLACE ID:", place.place_id)
          console.log("Place Location:", place.geometry.location)
          console.log("Place Latitude:", place.geometry.location.lat())
          console.log("Place Longitude:", place.geometry.location.lng())
          console.log("Formatted Address:", place.formatted_address)

        });

// ---------------------- END SEARCHBAR AUTOCOMPLETE TEST --------------------------------------

},

  close() {
    this.setState({ showModal: false });
  },

  open() {
    this.setState({ showModal: true });
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
                  <input type="text" class="form-control" name="eventTitle" id="eventTitle"  placeholder="what's it called"/>
              </div>
            </div>

            <div class="form-group">
              <label for="description" class="cols-sm-2 control-label">Event Description</label>
              <div class="cols-sm-10">
                  <textarea class="form-control" name="eventDesc" id="eventDesc"  placeholder="what's happening"/>
              </div>
            </div>

            <div class="form-group">
              <label for="startTime" class="cols-sm-2 control-label">Start Time</label>
              <div class="cols-sm-10">
                  <span class="input-group-addon"><i class="fa fa-user fa" aria-hidden="true"></i></span>
                  <input type="datetime-local" class="form-control" name="startTime" id="startTime"  placeholder="what's happening"/>
              </div>
            </div>

            <div class="form-group">
              <label for="endTime" class="cols-sm-2 control-label">End Time</label>
              <div class="cols-sm-10">
                  <span class="input-group-addon"><i class="fa fa-user fa" aria-hidden="true"></i></span>
                  <input type="datetime-local" class="form-control" name="endTime" id="endTime"  placeholder="what's happening"/>
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
                  onClick={this.close}
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
