import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import GroupForm from './GroupForm'

class NewGroupModal extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    return (
      <>

          <Button onClick={this.handleShow} variant="success">
            New Group
          </Button>

        <Modal
          show={this.state.show}
          onHide={this.handleClose}
          backdrop="static"
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>New Group</Modal.Title>
          </Modal.Header>
          <Modal.Body>
           <GroupForm handleClose={this.handleClose}/>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default NewGroupModal
