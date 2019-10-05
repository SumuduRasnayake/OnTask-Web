import React, { Component } from "react";
import Form from "react-bootstrap/Form";

import Button from "react-bootstrap/Button";

import axios from "axios";
import { withRouter } from "react-router-dom";

const formStyle = {
  padding: "15%",
  width: "80%",
  backgroundColor: "white",
};

class EmailForm extends Component {
  state = {
    EmailError: "",
    Error: "",
    success: "",
    isSubmitting: false,
    email: ""
  };

  handleSubmit = evt => {
    evt.preventDefault();
    this.setState({ isSubmitting: true });
    if (
      this.state.email === "" ||
      (this.state.email && this.state.email.length === 0)
    ) {
      this.setState({
        EmailError: "A valid email address is required",
        isSubmitting: false,
      });
    } else {
      console.log({
        email: this.state.email
      });
      axios
        .post("/auth/"+this.state.email+"/genToken")
        .then(res => {
          if(res.status === 200){
            this.setState({
              success: "We sent password reset link.",
            });
          }
        })
        .catch(err => {
          console.log(err);
          this.setState({
            error: "There was an error. Try again",
          });
        });
    }
  };

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit} style={formStyle}>
        <h4 style={{ textAlign: "center" }}>Reset Your Password</h4>
        <Form.Text style={{ textAlign: "center", color: "red" }}>
          {this.state.error}
        </Form.Text>
        <Form.Text style={{ textAlign: "center", color: "green" }}>
          {this.state.success}
        </Form.Text>
        <p>Enter your email address below and we'll send you a link to reset your password.</p>
        <Form.Group>
          <label>Email Address</label>
          <Form.Control
            type="email"
            name="email"
            onChange={this.handleChange}
          />
          <Form.Text style={{ color: "red" }}>
            {this.state.EmailError}
          </Form.Text>
        </Form.Group>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            className="btns"
            type="submit"
            disabled={this.state.isSubmitting ? true : false}
          >
            {this.state.isSubmitting ? "Processing.." : "Reset Password"}
          </Button>
        </div>
      </Form>
    );
  }
}

export default withRouter(EmailForm);
