import React, { Component } from 'react';
import { PageHeader, Jumbotron, Button, Grid, Row, Col, Navbar, Image } from 'react-bootstrap';
import config from './config/config'

class Welcome extends Component {
  render() {
    return (
      <div>
        <Grid style={{width:"100%", textAlign:"center", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Row>
            <Col xs={12} md={6} style={{marginTop:"5%"}}>
              <Image id="landing-image" width="60%" src="hnos.png" square />
            </Col>
            <Col xs={12} md={6} style={{marginTop:"13%"}}>
              <Jumbotron id="welcome-jubmo">
                <h1>HIIT it or quit it</h1>
                <p>
                  Achieve your fitness and weight loss goals
                </p>
                <p>
                  <Button id="login-button" bsSize="large" href={config.hioqiAPI+"/auth/fitbit"}>Login with Fitbit</Button>
                </p>
                <p>
                  <Button id="faq-link" bsSize="large" bsStyle="link" href="#">FAQ</Button>
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
