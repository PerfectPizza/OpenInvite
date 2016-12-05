
var dummyData = [
  {id:1, host: 'me', description:"cat party", start_time:"8:00PM", end_time:"900PM", address:"123 fakes street", locationName:"jakes house"},
  {id:2 ,host: 'me2', description:"cat party2", start_time:"6:00PM", end_time:"8:30PM", address:"123344 Jim Doorrr", locationName: "Hat Parlor"},
  {id:3,host: 'me3', description:"cat party3", start_time:"4:00PM", end_time:"10:00PM", address:"83834 Barn Ave.", locationName: "The park"},
  {id:2 ,host: 'me4', description:"cat party2", start_time:"6:00PM", end_time:"8:30PM", address:"123344 Jim Doorrr", locationName: "Hat Parlor"},
  {id:2 ,host: 'me5', description:"cat party2", start_time:"6:00PM", end_time:"8:30PM", address:"123344 Jim Doorrr", locationName: "Hat Parlor"}

]


class App extends React.Component {
  constructor(){
    super()
    this.state = {}
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
              <Map key="MAP"/>
            </ReactBootstrap.Col>
            {/* The column where the events are located*/}
            <ReactBootstrap.Col md={4}>
              <EventList key="Events" events={dummyData}/>
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
  constructor () {
    super()
    this.state = {}
  }

  render(){
    return (
      <div>
        <span>
          <img className="mapPicture" src={"http://www.denisbecaud.net/cartes/cartrome.jpg"} alt="alttext"/>
        </span>
      </div>
    )
  }
}


function EventList (props) {

    return (
      <div className="eventlist">
        {
          props.events.map(function(event){
            return (
              <Event event={event}/>
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
      host: this.props.event.host,
      description: this.props.event.description,
      startTime: this.props.event.start_time,
      endTime: this.props.event.end_time,
      address: this.props.event.address,
      locationName: this.props.event.locationName
    }
  }

  render(){
    var context = this
    return (
      <div className="event">
        <p className="eventText">Location: {context.state.locationName}</p>
        <p className="eventText">Host: {context.state.host}</p>
        <p className="eventText">Start Time: {context.state.startTime}  End Time: {context.state.endTime}</p>
        <p className="eventText">Address: {context.state.address}</p>
        <p className="eventText">Description: {context.state.description}</p>
      </div>
    )
  }

}

ReactDOM.render(<App key="MainApp"/>,document.getElementById('app'))
