import React, { Component } from "react";
import { Row, Col, Card, CardBody } from "reactstrap";
import {Link} from 'react-router-dom'
import Logo from "../../assets/img/brand/logo.PNG";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { withRouter } from "react-router-dom";
import MobileSignup from "./mobile";
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
            {/* <Tabs>
              <TabList style={{ padding: 0,border: 0 }}>
                <Tab style={{ width: "50%",border: 0, margin: 0, padding: 0 }}>
                  <h5 style={{ marginTop: "5%", textAlign: "center" }}>
                    Signup with mobile
                  </h5>
                </Tab>
                <Tab style={{ width: "50%", border: 0,margin: 0, padding: 0 }}>
                  <h5 style={{ marginTop: "5%", textAlign: "center" }}>
                    Signup with Email
                  </h5>
                </Tab>
              </TabList>

              <TabPanel style={{ marginTop: "-1.5%" }}>
                <MobileSignup signupWithMobile={this.signupWithMobile} />
              </TabPanel>
              <TabPanel style={{ marginTop: "-1%" }}> */}
                <EmailSignup />
              {/* </TabPanel>
            </Tabs> */}
            <h6 style={{marginTop: "2%",textAlign: "center"}}>Have an account? <Link to="/login">Login</Link></h6>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withRouter(Signup);
