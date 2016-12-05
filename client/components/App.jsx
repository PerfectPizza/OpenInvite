
var dummyData = [
  {id:1, host: 'me', description:"cat party", start_time:"8:00PM", end_time:"900PM", address:"123 fakes street", locationName:"jakes house"},
  {id:2 ,host: 'me2', description:"cat party2", start_time:"6:00PM", end_time:"8:30PM", address:"123344 Jim Doorrr", locationName: "Hat Parlor"},
  {id:3,host: 'me3', description:"cat party3", start_time:"4:00PM", end_time:"10:00PM", address:"83834 Barn Ave.", locationName: "The park"}
]


class App extends React.Component {
  constructor(){
    super()
    this.state = {}
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
              Map Column
              <Map key="MAP"/>
            </ReactBootstrap.Col>
            {/* The column where the events are located*/}
            <ReactBootstrap.Col md={4}>
              Event Column
              <EventList className="eventlist" key="Events" events={dummyData}/>
            </ReactBootstrap.Col>
          </ReactBootstrap.Row>

        </ReactBootstrap.Grid>
      </div>
    )
  }

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
          <img className="mapPicture" src={"http://www.drodd.com/images15/maps10.jpg"} alt="alttext"/>
        </span>
      </div>
    )
  }
}


function EventList (props) {

    return (
      <div>
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
        <p>Location: {context.state.locationName}</p>
        <p>Host: {context.state.host}</p>
        <p>Start Time: {context.state.startTime}  End Time: {context.state.endTime}</p>
        <p>Address: {context.state.address}</p>
        <p>Description: {context.state.description}</p>
      </div>
    )
  }

}

ReactDOM.render(<App key="MainApp"/>,document.getElementById('app'))
