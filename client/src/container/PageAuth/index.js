import React from 'react';

import Auth from '../../components/auth'

import './style.css';

class PageAuth extends React.Component {
  render() {
    return (
      <div className="page-auth">
        <div className="page-auth__connect">
          <Auth />
        </div>
      </div>
    );
  }
}

export default PageAuth;
