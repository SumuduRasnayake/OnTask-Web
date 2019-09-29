import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Input } from 'reactstrap'
import Form from 'react-bootstrap/Form'

class GroupSettingsModal extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
      isNameMatched: false
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

          <i alt="group settings" title="Group Settings" className="icon-settings" onClick={this.handleShow} style={{cursor: "pointer",marginRight: "5%"}}/>

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
            <Modal.Title>Settings - group <span style={{color: "gray"}}>{this.props.groupName}</span></Modal.Title>
          </Modal.Header>
          <Modal.Body
            style={{
              maxHeight: "calc(100vh - 200px)",
              height: "55vh",
              overflowY: "auto",
            }}
          >
            <Form.Group>
              <label><b>Group Visibility</b></label>
              <Input style={{width: "50%"}} type="select" name="select" id="exampleSelect">
            <option value="personal">Visible to everyone</option>
            <option value="public">Visible only to group members</option>
          </Input>
            </Form.Group>

            <Form.Group>
              <label><b>Delete Group</b></label>
              <p>All related data will be deleted. Type group name below to proceed</p>
              <Input type="text" />
              <Button variant="danger" disabled={this.state.isNameMatched ? false : true} style={{marginTop: "1%"}}>Delete Group</Button>
            </Form.Group>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default GroupSettingsModal
