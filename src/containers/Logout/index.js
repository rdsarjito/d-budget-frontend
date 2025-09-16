import { Component } from 'react';

import Auth from '../../components/Auth/AuthGoogle';

const API = process.env.REACT_APP_API_URL;

class Logout extends Component {
  render() {
    return (
      <Auth API={API} />
    );
  };
};

export default Logout;