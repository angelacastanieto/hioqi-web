import React, { Component } from 'react';
import { PageHeader } from 'react-bootstrap';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      activitiesResult: {
        activities: [],
        goals: {}
      }
    };
  }

  componentDidMount() {
    fetch("http://localhost:8000/users/"+this.props.match.params.user_id)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            activitiesResult: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    return (
      <div className="App">
        <PageHeader>User Summary</PageHeader>
        <p>You need to burn {this.state.activitiesResult.goals.caloriesOut} calories today!</p>
      </div>
    );
  }
}

export default User;
