
class CreateEventForm extends React.Component {

	constructor(props){
		super(props)

		this.state = {
			submission: null

		}
	}
	submitEvent(){
		var submissionValue = //formSubmit.val();

		this.setState({submission: submissionValue});
		axios('/post', this.state.submission);
	}
 
  render(){
    let closeModal = () => this.setState({ open: false })
 
    let saveAndClose = () => {
      api.saveData()
        .then(() => this.setState({ open: false }))
    }
 
    return (
      <div>
        <button type='button'>Create Event</button>
 
        <Modal
          show={this.state.open}
          onHide={closeModal}
          aria-labelledby="ModalHeader"
        >
          <Modal.Header closeButton>
            <Modal.Title id='ModalHeader'>Create An Event!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            
            <div className="createEventFormDiv">

            <form action="success.html" method="post" id="form">
              <div>
              <label>Event Location :</label>
              <input type="text" name="location" id="location" placeholder="What is the place called?" />
              </div>
              <div>
              <label>Event Address :</label>
              <input type="text" name="address" id="address" placeholder="What is the address?" />
              </div>
              <div>
              <label>Start Time :</label>
              <input type="time" name="startTime"  id="start" />

              <label>End Time :</label>
              <input type="time" name="endTime" id="end" />
              </div>
              <div>
              <label>Event Description :</label>
              </div>
              <div>
              <textarea name="description" form="form" id="description" placeholder="What's the plan?"></textarea>
              </div>
              <div>
              <button type="submit" value="Focus the text input" onClick={submitEvent}>Submit Your Event!</button>
              </div>
            </form>

          </div>
          </Modal.Body>
          <Modal.Footer>
            // If you don't have anything fancy to do you can use 
            // the convenient `Dismiss` component, it will 
            // trigger `onHide` when clicked 
            <Modal.Dismiss className='btn btn-default'>Cancel</Modal.Dismiss>
 
            // Or you can create your own dismiss buttons 
            <button className='btn btn-primary' onClick={saveAndClose}>
              Save Event
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}



//ReactDOM.render(<CreateEventForm />, document.body);