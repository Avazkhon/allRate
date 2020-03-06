import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Layout from '../Layout';

import './style.css';

class Home extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <Layout>
        <div className="page-Home">
          Home
        </div>
      </Layout>
    );
  }
}

Home.propType = {
  // authRegistration: PropTypes.func,
  // createNewUser: PropTypes.func,
  // authoLogin: PropTypes.func,
  // auth: PropTypes.shape({}),
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
})(Home);
