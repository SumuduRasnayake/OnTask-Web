import React, { Component } from "react";
import RequireAuth from "../../utils/PrivateRoute";
import SENDER from "../../utils/SENDER";
import ProfilePane from './ProfilePane'
import {
  Card,
  CardBody,
  Col,
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
            <Col xs="12" sm="12" lg="1" style={{paddingRight: 0}}></Col>  
      <Col xs="12" sm="12" lg="10" style={{paddingRight: 0}}>
     
            <ProfilePane id={this.props.match.params.id}/>
        
      </Col>
      </Row>  
    );
  }
}

export default RequireAuth(Profile);
