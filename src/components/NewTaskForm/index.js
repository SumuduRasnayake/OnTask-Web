import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form'
import SENDER from '../../utils/SENDER'

class NewTaskForm extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
      name: "",
      description: "",
      dueDate: ""
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = e => {
    e.preventDefault()
    SENDER.post('/tasks',{
      name: this.state.name,
      description: this.state.description,
      dueDate: this.state.dueDate,
      createdBy: localStorage.getItem('id'),
      groupId: this.props.groupId
    }).then(
      res => {
        if(res.status === 200){
          this.props.onAdd()
          this.handleClose()
        }
      }
    ).catch(
      err => {
        alert("There was an error.Try again")
        console.error(err)
      }
    )

  }

  render() {
    return (
      <>
        {/* <Button  style={{float: "right"}}> */}
        <i onClick={this.handleShow} style={{cursor: "pointer",display: this.props.isAdmin ? "block" : "none"}} className="fa fa-plus float-right"></i>
        {/* </Button> */}

        <Modal show={this.state.show} onHide={this.handleClose} backdrop="static">
          <Modal.Header closeButton>
            <Modal.Title>New Task</Modal.Title>
          </Modal.Header>
          <Form onChange={this.handleChange} onSubmit={this.handleSubmit}>
          <Modal.Body>

              <Form.Group controlId="taskName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="name" defaultValue={this.state.name} />
              </Form.Group>

              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" name="description" defaultValue={this.state.description} as="textarea" rows={4}/>
              </Form.Group>

              <Form.Group controlId="description">
                <Form.Label>Due date</Form.Label>
                <Form.Control type="date" name="dueDate" defaultValue={this.state.dueDate}/>
              </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <a style={{color: "red",cursor: "pointer"}}onClick={this.handleClose}>
              Cancel
            </a>
            <Button variant="success" type="submit">
                Create Task
              </Button>
          </Modal.Footer>
          </Form>
        </Modal>
      </>
    );
  }
}

export default NewTaskForm
