import './App.css';
import axios from 'axios';
import { Component } from 'react';
import './App.css';
import IndexScreens from './Component/IndexScreens';
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory 
} from "react-router-dom";
import Home from './Component/Home'


class App extends Component {
  constructor() {
    super();

    this.state = {
      loggedInStatus: false,
      user: {},
      msg: ""
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  checkLoginStatus() {
    return localStorage.getItem("isL");
  }

  componentDidMount() {
  }

  handleLogout() {
    this.setState({
      loggedInStatus: false,
      user: {}
    });
  }

  handleLogin(data) {
    //logout set false
    localStorage.setItem('isL', data.id ? true : false);
    this.setState({
      loggedInStatus: data.id ? true : false,
      user: data.user || {},
      msg: !data.user ? data : ""
    });
  }
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path={"/"}
              render={props => {
              let isLogin =  this.checkLoginStatus();
              if(isLogin)
                return  <Redirect to="/dashboard" />
                return (
                <Home
                  {...props}
                  handleLogin={this.handleLogin}
                  handleLogout={this.handleLogout}
                  loggedInStatus={this.state.loggedInStatus}
                />
              )
            }
          }
            />
            <Route
              exact
              path={"/dashboard"}
              render={props => (
                <IndexScreens
                  {...props}
                  loggedInStatus={this.state.loggedInStatus}
                />
              )}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }

}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}

export default App;
