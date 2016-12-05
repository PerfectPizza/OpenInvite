
class App extends React.Component {
  constructor(){
    super()
    this.state = {}
  }

  render(){
    return (
    <div>
      <p> there is supposed to be a button below this</p>

    {/* this a boostrap layout for the page */}
      <ReactBootstrap.Grid fluid>
        <ReactBootstrap.Row className="show-grid">
          <ReactBootstrap.Button bsStyle="primary"> Primary </ReactBootstrap.Button>
        </ReactBootstrap.Row>
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
            <EventList key="EventList"/>
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
        <span><img src={"http://bit.ly/2gHxhQI"} alt="alttext"/>Hello</span>
      </div>
    )
  }
}

class EventList extends React.Component {
  constructor () {
    super()
    this.state = {}
  }

  render(){
    return (
      <div>
        <span><img src={"http://calvarychapelvenice.org/wp-content/uploads/2015/09/EVENTS11.jpg"} alt="alttext"/>Hello</span>
      </div>
    )
  }

}

ReactDOM.render(<App key="MainApp"/>,document.getElementById('app'))
