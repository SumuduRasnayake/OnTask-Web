import React,{ Component} from "react";
import Form from "react-bootstrap/Form";
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import {withRouter} from 'react-router-dom'

const formStyle = {
  padding: "15%",
  width: "100%",
  backgroundColor: "white"
};

class EmailSignup extends Component{
  state={
    FirstNameError:"",
    EmailError:"",
    PasswordError:"",
    checked:false,
    CheckedError:false,
    Error:"",
    success:"",
    isSubmitting: false,
    fname: "",
    email: "",
    password: "",
    c_pass: "",
  }

  handleChecked = e => {
    e.stopPropagation()
    this.setState({checked: e.target.checked})
  }

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = evt => {
    //handle form validation here
    evt.preventDefault()
    this.setState({isSubmitting: true})
    if(this.state.fname === "" || (this.state.fname && this.state.fname.length === 0)){
      console.log("Hi")
      this.setState({FirstNameError:"First name is required",isSubmitting: false})
    }
    else if(this.state.email === "" || (this.state.email && this.state.email.length === 0)){
      this.setState({EmailError:"A valid email address is required",isSubmitting: false})
    }
    else if(this.state.password === "" || (this.state.password && this.state.password.length === 0)){
      this.setState({PasswordError:"A password which at least contains 6 characters is required",isSubmitting: false})
    }
    else if(this.state.c_pass === "" || (this.state.password  !== this.state.c_pass)){
      this.setState({PasswordError:"Passwords don't match",isSubmitting: false})
    }
    else if(!this.state.checked){
      this.setState({CheckedError:"You should agree to our terms & conditions",isSubmitting: false})
    }
    else{
      const username = this.state.email.split('@')[0]
      console.log({
        fname: this.state.fname,
        email: this.state.email,
        username: username,
        password: this.state.password
      })
      axios.post('/auth/signup',{
        fname: this.state.fname,
        email: this.state.email,
        username: username,
        password: this.state.password
      }).then(
        res => { 
        this.setState({success:"Signed up successfully.Check your email inbox"})
      }
      ).catch(err => {
        console.log(err)
      })
    }
  }

  render(){
    return (
      // <div style={formStyle}>
          <Form onSubmit={this.handleSubmit} style={formStyle}>
        <h4 style={{ textAlign: "center"}}>Sign up with Email</h4>
        <Form.Text style={{textAlign: "center",color: "red"}}>{this.state.Error}</Form.Text>
        <Form.Text style={{textAlign: "center",color: "green"}}>{this.state.success}</Form.Text>
        <Form.Group>
          <label>First name</label>
          <Form.Control name="fname" onChange={this.handleChange}/>
          <Form.Text style={{color: "red"}}>{this.state.FirstNameError}</Form.Text>
        </Form.Group>
  
        <Form.Group>
        <label>Email Address</label>
          <Form.Control type="email" name="email" onChange={this.handleChange}/>
          <Form.Text style={{color: "red"}}>{this.state.EmailError}</Form.Text>
        </Form.Group>
  
        <Form.Text style={{color: "red"}}>{this.state.PasswordError}</Form.Text>
        <Form.Row>
         <Form.Group as={Col}>
          <label>Password</label>
            <Form.Control type="password" name="password" onChange={this.handleChange}/>
          </Form.Group>
  
          <Form.Group as={Col}>
          <label></label>
            <Form.Control style={{marginTop: "2.5%"}} name="c_pass" onChange={this.handleChange} type="password" placeholder="confirm password"/>
          </Form.Group>
        </Form.Row>
  
        <Form.Group controlId="EmailCheck">
      <Form.Check type="checkbox" onChange={this.handleChecked} label="I agree to terms and privacy policy" />
      <Form.Text style={{color: "red"}}>{this.state.CheckedError}</Form.Text>
    </Form.Group>
  
        <div style={{display: "flex",justifyContent: "center"}}>
      <Button className="btns" type="submit" disabled={this.state.isSubmitting ? true : false}>
        {this.state.isSubmitting ? "Signing you up.." : "Create Account"}</Button>
      </div>
      </Form>
      // </div>
    );
  }


} 

export default withRouter(EmailSignup)
