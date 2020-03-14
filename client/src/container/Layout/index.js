import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from '../Header';
import Footer from '../Footer';

class Layout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.StrictMode>
        <div className="layout-header">
          <Header/>
        </div>
        <div className='content'>
          {this.props.children}
        </div>
        <div className="layout-footer">
          <Footer />
        </div>
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
