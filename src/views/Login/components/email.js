import React, { Component } from "react";
import {
  Form,
  Button,
} from "react-bootstrap";

import axios from "axios";
import { withRouter } from "react-router-dom";

const formStyle = {
  padding: "10%",
  width: "100%",
  backgroundColor: "white",
  borderRadius: "10px",
  paddingTop: "42%",
  paddingBottom: "42%",
};

class EmailLogin extends Component {
  state = {
    email: "",
    password: "",
    EmailError: "",
    PasswordError: "",
    isDisabled: false,
  };

  handleSubmit = e => {
    e.preventDefault();
    if (
      this.state.email === undefined ||
      (this.state.email && this.state.email.length === 0)
    ) {
      this.setState({ EmailError: "A valid email address is required" });
    } else if (
      this.state.password === undefined ||
      (this.state.password && this.state.password.length === 0)
    ) {
      this.setState({ PasswordError: "Please enter password" });
    } else {
      this.setState({isDisabled: true})
      axios
        .post("/auth/signin", {
          email: this.state.email,
          password: this.state.password,
        })
        .then(res => {
          if (res.status === 200) {
            localStorage.setItem("token", res.data.accessToken);
            axios.defaults.headers["Authorization"] =
              "Bearer " + res.data.accessToken;
            axios.get("/auth/user/me").then(res => {
              localStorage.setItem("id", res.data.id);
              this.props.history.push("/");
            });
          }
        })
        .catch(err => {
          alert("There was an error.Please try again");
          console.log(err);
          this.setState({isDisabled: false})
        });
    }
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div style={formStyle}>
        <Form onSubmit={this.handleSubmit}>
          <h4 style={{ textAlign: "center" }}>Login with Email</h4>
          <span style={{ color: "red", textAlign: "center" }}>
            {this.props.response}
          </span>
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

          <Form.Group>
            <label>
              Password <a href="/forgot-password">Forgot password?</a>
            </label>
            <Form.Control
              type="password"
              name="password"
              onChange={this.handleChange}
            />
            <Form.Text style={{ color: "red" }}>
              {this.state.PasswordError}
            </Form.Text>
          </Form.Group>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button variant="success" style={{width: "100%"}} type="submit" disabled={this.state.isDisabled}>
              {this.state.isDisabled ? "Logging you in" : "Log in"}
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}

export default withRouter(EmailLogin);
