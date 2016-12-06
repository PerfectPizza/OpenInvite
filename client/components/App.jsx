
var dummyData = [
  {id:1, host: 'me', description:"cat party", start_time:"8:00PM", end_time:"900PM", address:"123 fakes street", locationName:"jakes house"},
  {id:2 ,host: 'me2', description:"cat party2", start_time:"6:00PM", end_time:"8:30PM", address:"123344 Jim Doorrr", locationName: "Hat Parlor"},
  {id:3,host: 'me3', description:"cat party3", start_time:"4:00PM", end_time:"10:00PM", address:"83834 Barn Ave.", locationName: "The park"},
  {id:2 ,host: 'me4', description:"cat party2", start_time:"6:00PM", end_time:"8:30PM", address:"123344 Jim Doorrr", locationName: "Hat Parlor"},
  {id:2 ,host: 'me5', description:"cat party2", start_time:"6:00PM", end_time:"8:30PM", address:"123344 Jim Doorrr", locationName: "Hat Parlor"}

]

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

  updateMap(map){
    this.setState({map: map})
    console.log("Map State Updated", this.state.map)
  }

  createMap() {
        var myLatlng = new google.maps.LatLng(30.256729, -97.739650);
        var myDiv = ReactDOM.findDOMNode(this);
        var mapOptions = {
              zoom: 14,
              center: myLatlng
          }
          return new google.maps.Map(ReactDOM.findDOMNode(this), mapOptions)

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
              <Map key="MAP" updateMap={this.updateMap.bind(this)}/>
            </ReactBootstrap.Col>
            {/* The column where the events are located*/}
            <ReactBootstrap.Col md={4}>
              <EventList key="Events" users={this.state.users} events={this.state.events} map={this.state.map}/>
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
      map: null,
      updateMap: props.updateMap
    }
  }

  componentDidMount () {

      var myLatlng = new google.maps.LatLng(30.256729, -97.739650);
      var myDiv = ReactDOM.findDOMNode(this);
      var mapOptions = {
            zoom: 14,
            center: myLatlng
        }
        this.setState({map: new google.maps.Map(ReactDOM.findDOMNode(this), mapOptions)})

        this.state.updateMap(this.state.map)

    }


  render(){
    return (
      <div style={{width: "66vw", height: "80vh"}} id="map"></div>
    )
  }
}


function EventList (props) {
  console.log("EventList Props", props)

    return (
      <div className="eventlist">
        {
          props.events.map(function(event){
            return (
              <Event users={props.users} event={event} map={props.map}/>
            )
          })
        }
      </div>
    )
}

class Event extends React.Component {
  constructor(props){
    super(props)
    // console.log("Event props", props)
    this.state = {
      creator: props.event.creator,
      id: props.event.id,
      description: props.event.description,
      startTime: props.event.startTime,
      endTime: props.event.endTime,
      latitude: props.event.lat,
      longitude: props.event.long,
      map: props.map,
      users: props.users
    }
  }

  render(){
    var context = this
    //set current event's gps coordinates
    var gpsCoords = new google.maps.LatLng(this.state.latitude, this.state.longitude);
    console.log("this.state.map", this.state.map)
    window.marker[this.state.id] = new google.maps.Marker({
        id: this.state.id,
        position: gpsCoords,
        title: this.state.description,
        map: this.state.map
    });

    window.marker[this.state.id].addListener('click', function() {
        // map.setCenter(this.getPosition());
        window.location.href = window.location.href.split('#')[0] + '#' + this.state.id;
        //reset activeEvent class assignments
        $('.event').removeClass('activeEvent');
        //change background color of selected event
        $('#' + this.state.id).addClass('activeEvent');
    })

    return (
      <div className="event" id={this.state.id}>
        <p className="eventText">Host: {this.state.users[this.state.creator].name}</p>
        <p className="eventText">Start Time: {context.state.startTime}  End Time: {context.state.endTime}</p>
        <p className="eventText">Description: {context.state.description}</p>
      </div>
    )
  }
}


ReactDOM.render(<App key="MainApp"/>, document.getElementById('app'))
