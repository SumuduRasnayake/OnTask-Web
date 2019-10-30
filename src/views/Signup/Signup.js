import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import {Link} from 'react-router-dom'
import Logo from "../../assets/img/brand/logo.PNG";
import "react-tabs/style/react-tabs.css";
import { withRouter } from "react-router-dom";
import EmailSignup from "./email";
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
    // background: "linear-gradient(180deg, #1117e1 50%, #FFFFFF 50%)",
    backgroundColor: "#1FDC75",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  minHeight: "100vh" 
  },
};

class Signup extends Component {
  componentDidMount() {
    axios.get("/auth/user/me").then(res => {
      if (res.data.id > 0) {
        //alert("You are already logged in as " + res.data.fname +"\nPlease logout and try again")
        this.props.history.push("/");
      }
    });
  }

  componentDidUpdate() {
    axios.get("/auth/user/me").then(res => {
      if (res.data.id > 0) {
        //alert("You are already logged in as " + res.data.fname +"\nPlease logout and try again")
        this.props.history.push("/");
      }
    });
  }

  render() {
    return (
      <div style={styles.background}>
                  <EmailSignup />
                  <h6 style={{marginTop: "1%",textAlign: "center"}}>Have an account? <Link to="/login">Login</Link></h6>  
      </div>
    );
  }
}

export default withRouter(Signup);
