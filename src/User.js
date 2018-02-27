import React, { Component } from 'react';
import { PageHeader } from 'react-bootstrap';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      user: {}
    };
  }

  componentDidMount() {
    fetch("http://localhost:8000/users/"+this.props.match.params.user_id)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.items
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
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
      </div>
    );
  }
}

export default User;
