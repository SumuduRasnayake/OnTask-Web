import React, { Component } from "react"
import {Row,Col,Card,
  CardBody} from 'reactstrap'
import Logo from '../../assets/img/brand/logo.PNG' 
import MobileLogin from './components/mobile'
import EmailLogin from './components/email'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

class Login extends Component{
  constructor(props) {
    super(props);
    this.state={
      MailConfirmedText: ""
    } 
  }

  componentDidMount(){
    axios.defaults.headers["Authorization"] = "Bearer " + localStorage.getItem("token");
    axios
    .get("/auth/user/me")
    .then(res => {
      alert("You are already logged as "+res.data.fname + ". Try logout first")
      this.props.history.push("/")
    })
    .catch(err => {
      console.log("err: ", err);
    });

    const params = new URLSearchParams(this.props.location.search);
    const token = params.get('token')
    if(token){
      axios
    .post("/auth/verify/email/"+token)
    .then(res => {
      console.log(res);
      this.setState({MailConfirmedText: "Email address was successfully verified"})
    })    
    .catch(err => {
      console.log("con err: ", err);
    });
    }
  }

  render(){
    return (
      <div style={{minHeight: "100vh",backgroundColor: "#1FDC75"}}>
        <div style={{display: "flex",justifyContent: "left"}}>
        
      </div>
      <Row style={{margin: 0,marginTop: 60}}>
          <Col xs="12" sm="12" lg="9" className="p-2" style={{paddingRight: 0}}>
          <Card style={{height: "80vh",}}>
                    <CardBody>
                    <MobileLogin />
                    </CardBody>
                  </Card>
          </Col>

          <Col xs="12" sm="12" lg="3" className="p-2">
          <Card style={{height: "80vh",paddingLeft: 0}}>
          
                    <CardBody>
                    <EmailLogin history={this.props.history}/>
                    </CardBody>
                  </Card>
          </Col>
          </Row>
      </div>
  )
  }
}

export default withRouter(Login)