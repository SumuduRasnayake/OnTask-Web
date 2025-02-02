import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Logo from '../../assets/img/brand/logo.PNG'
import { withRouter,Link } from "react-router-dom";

const formStyle = {
  padding: "2%",
  paddingTop: "4%",
  paddingLeft: "5%",
  paddingRight: "5%",
  width: "60%",
  backgroundColor: "white",
};

class EmailSignup extends Component {
  state = {
    FirstNameError: "",
    EmailError: "",
    PasswordError: "",
    checked: false,
    CheckedError: false,
    Error: "",
    success: "If you have a smartphone, please sign up on mobile app",
    isSubmitting: false,
    fname: "",
    email: "",
    password: "",
    c_pass: "",
  };

  handleChecked = e => {
    e.stopPropagation();
    this.setState({ checked: e.target.checked });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = evt => {
    //handle form validation here
    evt.preventDefault();
    this.setState({ isSubmitting: true });
    if (
      this.state.fname === "" ||
      (this.state.fname && this.state.fname.length === 0)
    ) {
      this.setState({
        FirstNameError: "First name is required",
        isSubmitting: false,
      });
    } else if (
      this.state.email === "" ||
      (this.state.email && this.state.email.length === 0)
    ) {
      this.setState({
        EmailError: "A valid email address is required",
        isSubmitting: false,
      });
    } else if (
      this.state.password === "" ||
      (this.state.password && this.state.password.length === 0)
    ) {
      this.setState({
        PasswordError:
          "A password which at least contains 6 characters is required",
        isSubmitting: false,
      });
    } else if (
      this.state.c_pass === "" ||
      this.state.password !== this.state.c_pass
    ) {
      this.setState({
        PasswordError: "Passwords don't match",
        isSubmitting: false,
      });
    } else if (!this.state.checked) {
      this.setState({
        CheckedError: "You should agree to our terms & conditions",
        isSubmitting: false,
      });
    } else {
      const username = this.state.email.split("@")[0];
      axios
        .post("/auth/signup", {
          fname: this.state.fname,
          email: this.state.email,
          username: username,
          password: this.state.password,
        })
        .then(res => {
          this.setState({
            success: "Signed up successfully.Check your email inbox",
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit} style={formStyle}>
        <div style={{ textAlign: "center" }}>
          <img src={Logo} height="100" width="100" alt="" />
          <h5>Sign up with Email</h5>
        </div>
        <p style={{ textAlign: "center", color: "red" }}>{this.state.Error}</p>
        <p style={{ textAlign: "center", color: "green" }}>
          {this.state.success}
        </p>
        <Form.Group>
          <label>First name</label>
          <Form.Control
            name="fname"
            style={{ width: "70%" }}
            onChange={this.handleChange}
          />
          <Form.Text style={{ color: "red" }}>
            {this.state.FirstNameError}
          </Form.Text>
        </Form.Group>

{/* Email Address */}
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

{/*Password and confirm password fields*/}
        <Form.Text style={{ color: "red" }}>
          {this.state.PasswordError}
        </Form.Text>
        <Form.Row>
          <Col sm={12} md={6}>
            <Form.Group>
              <label>Password</label>
              <Form.Control
                type="password"
                name="password"
                onChange={this.handleChange}
              />
            </Form.Group>
          </Col>
          <Col sm={12} md={6}>
            <Form.Group>
              <label></label>
              <Form.Control
                style={{ marginTop: "2.5%" }}
                name="c_pass"
                onChange={this.handleChange}
                type="password"
                placeholder="confirm password"
              />
            </Form.Group>
          </Col>
        </Form.Row>

        <Form.Group>
          <Form.Check
            type="checkbox"
            onChange={this.handleChecked}
            label={<p>
              I agree to terms and <Link to="/privacy-policy">privacy policy</Link>
            </p>}
          />
          <Form.Text style={{ color: "red" }}>
            {this.state.CheckedError}
          </Form.Text>
        </Form.Group>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            className="btns"
            variant="success"
            type="submit"
            disabled={this.state.isSubmitting ? true : false}
          >
            {this.state.isSubmitting ? "Signing you up.." : "Create Account"}
          </Button>
        </div>
      </Form>
      // </div>
    );
  }
}

export default withRouter(EmailSignup);
