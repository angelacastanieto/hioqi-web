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
          console.log(result)
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
    return (
      <div className="App">
        <PageHeader>Hello {this.state.getUserResult.name}, you crazy bitch!!!</PageHeader>
        <img src={this.state.getUserResult.avatar}/>
        <p>You have burned {this.state.getUserResult.calories_out} out of {this.state.getUserResult.calories_goal} calories today.</p>
        <p>You need to take {this.state.getUserResult.steps_left_to_go} more steps to reach your goal!</p>
        <p>You can do eeeeet!</p>
      </div>
    );
  }
}

export default User;
