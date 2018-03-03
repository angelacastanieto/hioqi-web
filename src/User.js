import React, { Component } from 'react';
import { PageHeader, Button, Nav, NavItem, Navbar, Image, Grid, Row, Col, Jumbotron } from 'react-bootstrap';

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
      return (
        <div className="App">
          <Navbar style={{backgroundColor:"cccccc"}} collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="/">HIOQI</a>
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
          <Grid style={{width:"100%", textAlign:"center", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Row>
              <Col xs={12} style={{marginTop:"20%"}}>
                <Jumbotron id="user-jumbo" style={{height:"75%", width:"75%", margin: "0 auto", textAlign:"center"}}>
                  <p>
                    You have burned {this.state.getUserResult.calories_out} calories and eaten {this.state.getUserResult.calories_in} calories so far today.
                  </p>
                  <p>
                    You need to burn {this.state.getUserResult.calories_left_to_go} more calories to reach your deficit of {this.state.getUserResult.calorie_deficit_goal} calories.
                  </p>
                  <p>
                    That&#39;s {this.state.getUserResult.steps_left_to_go} more steps!
                  </p>
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
