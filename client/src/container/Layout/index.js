import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Menu from 'components/Menu';

import Header from '../Header';
import Footer from '../Footer';

const Layout = (props) => {
  return (
    <React.StrictMode>
      <div className="layout-header">
        <Header/>
      </div>
      <div style={{display: 'flex'}} className='content'>
        <Menu />
        {props.children}
      </div>
      <div className="layout-footer">
        <Footer />
      </div>
    </React.StrictMode>
  );
}

Layout.propTypes = {
  children: PropTypes.shape(),
}

function mapStateToProps(state) {
  const {
    auth,
  } = state;
  return {
    auth,
  };
}

export default connect(
  mapStateToProps,
  {}
)(Layout);
