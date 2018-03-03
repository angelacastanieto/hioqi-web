import React, { Component } from 'react';
import { PageHeader, Jumbotron, Button, Grid, Row, Col, Navbar, Image } from 'react-bootstrap';

class Welcome extends Component {
  render() {
    return (
      <div>
        <Grid style={{width:"100%", textAlign:"center", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Row>
            <Col xs={12} md={6} style={{marginTop:"2%"}}>
              <Image width="75%" src="hioqi_logo.jpg" square />
            </Col>
            <Col xs={12} md={6} style={{marginTop:"15%"}}>
              <Jumbotron style={{height:"80%", width:"80%", margin: "0 auto", textAlign:"center"}}>
                <h1>Welcome to HIOQI</h1>
                <p>
                  Visualize your fitness and weight loss goals.
                </p>
                <p>
                  <Button href="http://localhost:8000/auth/fitbit" style={{backgroundColor:"#d0eff2"}}>Login with Fitbit</Button>
                </p>
              </Jumbotron>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Welcome;
