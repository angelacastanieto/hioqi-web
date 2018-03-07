import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import { Navbar, MenuItem, NavDropdown, Nav, NavItem } from 'react-bootstrap';
import User from './User'
import Welcome from './Welcome'
import Receiver from './Receiver'

class App extends Component {

  render() {
    return (
      <div>
        <Router>
          <div>
            <Route exact={true} path="/" component={Welcome} />
            <Route exact={true} path="/callback" component={Receiver} />
            <Route path="/users/:user_id" component={User} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
