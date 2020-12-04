import React, { Component } from "react";
import axios from "axios";

import Login from "./auth/Login";
import { Redirect } from "react-router-dom";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    this.handleFailAuth = this.handleFailAuth.bind(this);
  }

  handleSuccessfulAuth(data) {
    console.log(data);
    this.props.handleLogin(data);
  }

  handleFailAuth(data) {
    this.props.handleLogin(data);
  }

  handleLogoutClick() {
    axios
      .delete("http://localhost:5001/delete", { withCredentials: true })
      .then(response => {
        this.props.handleLogout();
      })
      .catch(error => {
        console.log("logout error", error);
      });
  }

  render() {
    if(!localStorage.getItem('isL'))
        return  <Redirect to="/dashboard" />
    return (
      <div>
        <h1>Home</h1>
        <h1>Status: {this.props.loggedInStatus}</h1>
        <button onClick={() => this.handleLogoutClick()}>Logout</button>
        {/* <Registration handleSuccessfulAuth={this.handleSuccessfulAuth} /> */}
        <Login handleSuccessfulAuth={this.handleSuccessfulAuth} handleFailAuth={this.handleFailAuth} />
      </div>
    );
  }
}