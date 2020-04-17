import React, { Component } from "react";

import "../assets/styles/login.css";

import { createUser } from "../actions/Users";

import { connect } from "react-redux";

export class SignUp extends Component {
  state = {
    name: "",
    email: "",
    address: "",
    password: "",
    confirmPassword: "",
    showError: false,
    errorMessage: "",
  };

  OnTextChange = (event) => {
    this.setState({
      errorMessage: "",
      [event.target.name]: event.target.value,
    });
  };

  validateAndRegister = async () => {
    //check if any of the fields are empty
    if (
      !this.state.name ||
      !this.state.email ||
      !this.state.password ||
      !this.state.confirmPassword
    ) {
      this.setState({
        errorMessage: "Enter all the fields",
      });
    } else {
      //check if the pasword and confirm password fleds are matching or not
      if (this.state.password !== this.state.confirmPassword) {
        this.setState({
          errorMessage: "Password does not match",
        });
      } else {
        //checking the length of password
        if (this.state.password.length < 5) {
          this.setState({
            errorMessage: "Password length should be greater then 5!",
          });
        } else {
          //checking the length of email
          if (this.state.email.length < 5) {
            this.setState({
              errorMessage: "Please enter valid email!",
            });
          } else {
            //if all conditions are satisfied call the action and pass the values
            this.setState({
              errorMessage: "",
            });
            let user = {
              user_name: this.state.name,
              user_email: this.state.email,
              user_password: this.state.password,
            };
            await this.props.createUser(user, this.props.history);

            this.props.errorMessage
              ? this.setState({ errorMessage: this.props.errorMessage })
              : this.setState({
                  name: "",
                  email: "",
                  password: "",
                  address: "",
                  confirmPassword: "",
                });
          }
        }
      }
    }
  };

  render() {
    return (
      <div>
        <div className="login-signup-card">
          <h3 className="login-Signup-Text-header">SignUp</h3>
          <div className="login-signup-elements-container">
            <input
              id="signup-name"
              className="input-field"
              name="name"
              value={this.state.name}
              placeholder="enter name"
              onChange={(e) => this.OnTextChange(e)}
            />
            <input
              id="signup-email"
              className="input-field"
              name="email"
              placeholder="enter email"
              value={this.state.email}
              onChange={(e) => this.OnTextChange(e)}
            />

            <input
              id="signup-password"
              className="input-field"
              name="password"
              placeholder="enter password"
              type="password"
              value={this.state.password}
              onChange={(e) => this.OnTextChange(e)}
            />
            <input
              id="signup-confirm-password"
              className="input-field"
              name="confirmPassword"
              placeholder="confirm password"
              type="password"
              value={this.state.confirmPassword}
              onChange={(e) => this.OnTextChange(e)}
            />
            <span className="error-text">{this.state.errorMessage}</span>
            <button
              id="signup-submit-button"
              className="submit-button"
              onClick={this.validateAndRegister}
            >
              SignUp
            </button>
            <span
              style={{
                textAlign: "center",
                cursor: "pointer",
                marginTop: "8px",
              }}
              onClick={() => this.props.history.push("/login")}
            >
              Already have an account ? Login
            </span>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  createUserMessage: state.UserReducer.createUserMessage,
  errorMessage: state.UserReducer.errorMessage,
});

export default connect(mapStateToProps, { createUser })(SignUp);
