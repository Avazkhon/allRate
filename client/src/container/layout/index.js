import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from '../header';

import './style.css';

class Layout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.StrictMode>
        <div className="layout">
          <Header/>
        </div>
        {this.props.children}
      </React.StrictMode>
    );
  }
}

Layout.propType = {
}

function mapStateToProps(state) {
  const {
    auth,
  } = state;
  return {
    auth,
  };
}

export default connect(mapStateToProps, {
})(Layout);
