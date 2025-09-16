import { Component } from 'react';
import { connect } from 'react-redux';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';

import * as actions from '../../actions';
import { Redirect } from 'react-router-dom';

const clientID = "934797589502-7j87nauu2nqbqkjcf0dkb8bbq9fcep7p.apps.googleusercontent.com";

const GoogleLoginButton = ({ onSuccess, onFailure }) => {
  const login = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (codeResponse) => {
      try {
        await onSuccess(codeResponse);
      } catch (e) {
        onFailure && onFailure(e);
      }
    },
    onError: (err) => {
      onFailure && onFailure(err);
    }
  });

  return (
    <button onClick={() => login()}>
      Google
    </button>
  );
};

class LoginGoogle extends Component {
  state = {
    redirect: false
  };

  responseGoogleSucces = async(codeResponse) => {
    await this.props.loginGoogle(codeResponse);
    await this.props.getUser();
    this.setState({ redirect: true });
  };

  responseGoogleFailed(err) {
    console.log(err);
  };

  _renderContent() {
    return (
      <GoogleOAuthProvider clientId={clientID}>
        <GoogleLoginButton 
          onSuccess={this.responseGoogleSucces}
          onFailure={this.responseGoogleFailed}
        />
      </GoogleOAuthProvider>
    );
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to='/dashboard'/>;
    };
    return (
      <GoogleOAuthProvider clientId={clientID}>
        <GoogleLoginButton 
          onSuccess={this.responseGoogleSucces}
          onFailure={this.responseGoogleFailed}
        />
      </GoogleOAuthProvider>
    );
  };
};

export default connect(({ user }) => ({ user }), actions)(LoginGoogle);