import React, { Component } from 'react';
import { PageHeader } from 'react-bootstrap';

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
    fetch("http://localhost:8000/users/"+this.props.match.params.user_id)
      .then(res => res.json())
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
          <PageHeader>Hello {this.state.getUserResult.name}, you crazy bitch!!!</PageHeader>
          <img src={this.state.getUserResult.avatar}/>
          <p>You have burned {this.state.getUserResult.calories_out} calories and eaten {this.state.getUserResult.calories_in} calories so far today.</p>
          <p>You need to burn {this.state.getUserResult.calories_left_to_go} more calories to reach your deficit of {this.state.getUserResult.calorie_deficit_goal} calories.</p>
          <p>That&#39;s {this.state.getUserResult.steps_left_to_go} more steps!</p>
        </div>
      );
    }
  }
}

export default User;
