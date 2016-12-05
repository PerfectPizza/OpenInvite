
class App extends React.Component {
  constructor(){
    super()
    this.state = {}
  }

  render(){
    return (
    <div>
      <p> there is supposed to be a button below this</p>
      <ReactBootstrap.Button bsStyle="primary"> Primary </ReactBootstrap.Button>

    {/* this a boostrap layout for the page */}
      <ReactBootstrap.Grid>
        {/* A row for the map and events*/}

        <ReactBootstrap.Row className="show-grid">
          {/* The column where the google map is located*/}
          <ReactBootstrap.Col md={8}>
            <code>{'<h1> Map Column</h1>'}</code>
          </ReactBootstrap.Col>
          {/* The column where the events are located*/}
          <ReactBootstrap.Col md={4}>

            <code> {'<h1> Events Column</h1>'}</code>

          </ReactBootstrap.Col>
        </ReactBootstrap.Row>

      </ReactBootstrap.Grid>
    </div>
    )
  }

}

ReactDOM.render(<App key="MainApp"/>,document.getElementById('app'))
