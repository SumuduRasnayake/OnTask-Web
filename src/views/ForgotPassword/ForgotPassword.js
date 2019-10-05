import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import {Link} from 'react-router-dom'
import Logo from "../../assets/img/brand/logo.PNG";
import EmailSignup from "./EmailForm";
import axios from "axios";

const styles = {
  header: {
    display: "flex",
    justifyContent: "left",
  },
  emailSignupBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  mobileSignupBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "orange",
    borderRadius: "10px",
    margin: "10px",
  },
  background: {
    backgroundColor: "#1FDC75",
  minHeight: "100vh" 
  },
};

class ForgotPassword extends Component {
  componentDidMount() {
    axios.get("/auth/user/me").then(res => {
      if (res.data.id > 0) {
        this.props.history.push("/");
      }
    });
  }

  componentDidUpdate() {
    axios.get("/auth/user/me").then(res => {
      if (res.data.id > 0) {
        this.props.history.push("/");
      }
    });
  }

  render() {
    return (
      <div style={styles.background}>
        <div style={{ display: "flex", justifyContent: "left" }}>
          <img src={Logo} alt="" height="50" width="150" />
        </div>
        <Row style={{ margin: 0}}>
          <Col
            xs="12"
            sm="6"
            lg="3"
            className="p-3"
            style={{ paddingRight: 0 }}
          />
          <Col
            xs="12"
            sm="12"
            lg="6"
            className="p-3"
            style={{ paddingRight: 0 }}
          >
                <EmailSignup /> 
            <h6 style={{marginTop: "2%"}}>Have an account? <Link to="/login">Login</Link></h6>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ForgotPassword
