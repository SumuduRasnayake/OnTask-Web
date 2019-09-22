import React, { Component } from "react";
import { Bar, Line } from "react-chartjs-2";
import RequireAuth from "../../utils/PrivateRoute";
import { Activity } from 'styled-icons/feather/Activity'
import SENDER from "../../utils/SENDER";
import ProfilePane from './ProfilePane'
import {
  ButtonDropdown,
  Popover, PopoverBody, PopoverHeader,
  Button,
  ButtonGroup,
  ListGroupItem,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
} from "reactstrap";

class Profile extends Component {
  state = {
    userData: "",
    lname: "",
    education: []
  };

  componentDidMount() {
      SENDER.get("/users/" + this.props.match.params.id).then(res => {
        this.setState({userData: res.data});
      });
  
      this.setState({lname: this.state.userData.lname ? this.state.userData.lname: ""})  
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      SENDER.get("/users/" + this.props.match.params.id).then(res => {
        this.setState({userData: res.data});
      });
  
      this.setState({lname: this.state.userData.lname ? this.state.userData.lname: ""})  
    }
  }

  toggle = () => {
    this.setState({
      popoverOpen: !this.state.popoverOpen,
    });
  }

  render() {
    return (
      <Row style={{ marginTop: "0.5%" }}>
      
      <Col xs="12" sm="12" lg="12" style={{paddingRight: 0}}>
      <Card style={{minHeight: "88vh"}}>
          <CardBody>
            <ProfilePane id={this.props.match.params.id}/>
          </CardBody>
        </Card>
      </Col>
      </Row>  
    );
  }
}

export default RequireAuth(Profile);
