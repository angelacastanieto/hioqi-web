import React, { Component } from 'react';
import { PageHeader, Jumbotron, Button, Grid, Row, Col, Navbar, Image } from 'react-bootstrap';
import config from './config/config'
import { OauthSender } from 'react-oauth-flow';

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
                <OauthSender
                  authorizeUrl="https://www.fitbit.com/oauth2/authorize"
                  clientId={process.env.REACT_APP_FITBIT_KEY}
                  redirectUri={config.webURL+"/callback"}
                  state={{a:'b'}}
                  render={({ url }) => <a href={url}>Login with Fitbit</a>}
                  args={ { scope: 'activity weight nutrition profile' } }
                />
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
