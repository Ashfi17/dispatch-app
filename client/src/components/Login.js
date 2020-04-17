import React, { Component } from "react";
import { login } from "../actions/Users";
import { connect } from "react-redux";

import "../assets/styles/login.css";

export class Login extends Component {
  state = {
    name: "",
    email: "",
    errorMessage: "",
  };
  //function to handle the text change
  OnTextChange = (event) => {
    this.setState({
      errorMessage: "",
      [event.target.name]: event.target.value,
    });
  };

  //function to login the user by passing the values typed by user in input field
  loginUser = async () => {
    let userLoginCreds = {
      user_email: this.state.email,
      user_password: this.state.password,
    };
    await this.props.login(userLoginCreds, this.props.history);
    this.props.errorMessage
      ? this.setState({ errorMessage: this.props.errorMessage })
      : this.setState({ email: "", password: "" });
  };

  render() {
    return (
      <div>
        <p
          style={{
            textAlign: "center",
          }}
        >
          {this.props.history.location.state
            ? this.props.history.location.state.message
            : ""}
        </p>
        <div className="login-signup-card">
          <div className="login-signup-elements-container">
            <h3 className="login-Signup-Text-header">Login</h3>
            <input
              id="login-email"
              className="input-field"
              name="email"
              placeholder="enter email"
              value={this.state.email}
              onChange={(e) => this.OnTextChange(e)}
            />
            <input
              id="login-password"
              className="input-field"
              name="password"
              placeholder="enter password"
              type="password"
              value={this.state.password}
              onChange={(e) => this.OnTextChange(e)}
            />
            <span className="error-text">{this.state.errorMessage}</span>
            <button
              id="login-submit-button"
              className="submit-button"
              onClick={this.loginUser}
            >
              Login
            </button>
            <span
              style={{
                textAlign: "center",
                cursor: "pointer",
                marginTop: "8px",
              }}
              onClick={() => this.props.history.push("/sign-up")}
            >
              Dont have an account ? SignUp
            </span>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loginMessage: state.UserReducer.loginMessage,
  errorMessage: state.UserReducer.errorMessage,
});

export default connect(mapStateToProps, { login })(Login);
