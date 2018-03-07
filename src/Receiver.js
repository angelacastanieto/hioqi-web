import React, { Component } from 'react';
import { OauthReceiver } from 'react-oauth-flow';
import  { Redirect } from 'react-router-dom'
import config from './config/config'

export default class Receiver extends Component {
  handleSuccess = async (accessToken, { response }) => {
    console.log('Successfully authorized');

    fetch(config.hioqiAPI+"/auth/fitbit/callback", {
           method: 'POST',
           credentials: 'include',
           headers: {'Content-Type':'application/json'},
           body: JSON.stringify({
             access_token: response.access_token,
             refresh_token: response.refresh_token,
             user_id: response.user_id
          }),
         })
      .then(
        (res) => {
          if (res.status === 200) {
            return this.props.history.push('/users/'+response.user_id)
          }
          return this.props.history.push('/')
        },
        (error) => {
          console.log(error);
          return this.props.history.push('/')
        }
      )
  };

  handleError = error => {
    console.log(error);
    return this.props.history.push('/')
  };

  render() {
    return (
      <OauthReceiver
        tokenUrl="https://api.fitbit.com/oauth2/token"
        clientId={process.env.REACT_APP_FITBIT_KEY}
        clientSecret={process.env.REACT_APP_FITBIT_SECRET}
        redirectUri="http://localhost:3000/callback"s
        onAuthSuccess={this.handleSuccess}
        onAuthError={this.handleError}
          render={({ processing, state, error }) => {
          return (
          <div>
            {processing && <p>Authorizing now...</p>}
            {error && (
              <p className="error">An error occured: {error.message}</p>
            )}
          </div>
        );
      }
      }
      />
    );
  }
}
