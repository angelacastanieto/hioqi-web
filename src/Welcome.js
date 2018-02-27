import React, { Component } from 'react';
import { PageHeader } from 'react-bootstrap';

class Welcome extends Component {
  render() {
    return (
      <div className="App">
        <PageHeader>Welcome to HIOQI</PageHeader>
        <a href={'http://localhost:8000/auth/fitbit'}>Login with Fitbit</a>
      </div>
    );
  }
}

export default Welcome;
