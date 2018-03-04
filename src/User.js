import React, { Component } from 'react';
import { PageHeader, Button, Nav, NavItem, Navbar, Image, Grid, Row, Col, Jumbotron, View } from 'react-bootstrap';
import CircularProgressbar from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      getUserResult: {
        name: "",
        avatar: "",
        steps_left_to_go: 0,
        calories_left_to_go: 0,
        calorie_deficit_goal: 0,
        calories_in: 0,
        calories_out: 0,
        calories_goal: 0,
        steps_goal: 0,
        steps_so_far: 0
      }
    };
  }

  componentDidMount() {
    this.getUser(false)
  }

  renderProfilePicture() {
    if (this.state.getUserResult.avatar) {
      return (
          <Image width="15%" src={this.state.getUserResult.avatar} circle />
      );
    }
  }

  logOut() {
    // send request to hioqi to logout (revoke token)
  }

  getUser(resync) {
    fetch("http://localhost:8000/users/"+this.props.match.params.user_id+"?resync="+resync, {
           method: 'get'
         })
      .then(
        (res) => {
          if (res.status === 401) {
            return this.props.history.push('/')
          }
          return res.json()
        }
      )
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            getUserResult: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
          this.props.history.push('/')
        }
      )
  }

  render() {
    if (!this.state.isLoaded) {
      return (
        <div className="App">
          Loading
        </div>
      )
    } else {
      var imageStyle = {
        container: {
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'center',
          backgroundColor: '#000000',
          width: 320
        },
        backdrop: {
          paddingTop: 60,
          width: 320,
          height: 120
        },
        backdropView: {
          height: 120,
          width: 320,
          backgroundColor: 'rgba(0,0,0,0)',
        },
        headline: {
          fontSize: 20,
          textAlign: 'center',
          backgroundColor: 'rgba(0,0,0,0)',
          color: 'white'
        }
      }
      return (
        <div className="App">
          <Navbar className="center" collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
                <Image id="navbar-image" width="15%" src="/hnot.png" square />
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav pullRight>
                <NavItem eventKey={1} href="#">
                <Button bsStyle="link" onClick={() => this.getUser(true)}>Resync with Fitbit</Button>
                </NavItem>
                <NavItem eventKey={2}>
                  {this.renderProfilePicture()}
                  <Button bsStyle="link" onClick={this.logOut}>Logout</Button>
                </NavItem>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Grid>
            <Row>
              <Col xs={12} md={8} style={{marginTop:"0%"}}>
              <div id="user-jumbo" style={{ width:"75%", margin: "0 auto", textAlign:"center"}}>
                <h1 style={ { color: "#3ACCCC", marginBottom: "5%" } } >Burn Goal</h1>
                <CircularProgressbar
                  initialAnimation={true}
                  styles={{
                    path: { stroke: "#3ACCCC", fill: "#3ACCCC", color: "#3ACCCC" }
                  }}
                  percentage={Math.trunc(this.state.getUserResult.calories_out/(this.state.getUserResult.calories_in+this.state.getUserResult.calorie_deficit_goal)*100)} />
                <h2 style={ { color: "#3ACCCC" } } >of {(this.state.getUserResult.calories_in+this.state.getUserResult.calorie_deficit_goal)} calories</h2>
              </div>
              </Col>
              <Col xs={12} md={4} style={{marginTop:"15%"}}>
                <Jumbotron id="user-jumbo" style={{ height:"100%", width:"100%", margin: "0 auto", textAlign:"center"}}>
                <div class="img"></div>
                  <div class="container">
                      <div class="row">
                          <div class="col-lg-12">
                            <h2 style={ { color: "#3ACCCC", marginBottom: "5%" } } >That&#39;s</h2>
                            <h1 style={ { color: "#3ACCCC", marginBottom: "5%" } } >{this.state.getUserResult.steps_left_to_go}</h1>
                            <h2 style={ { color: "#3ACCCC", marginBottom: "5%" } } >more steps!</h2>
                          </div>
                      </div>
                  </div>
                </Jumbotron>
              </Col>
            </Row>
          </Grid>
        </div>
      );
    }
  }
}

export default User;
