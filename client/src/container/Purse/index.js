import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PurseComponent from 'components/PurseComponent';

import Layout from '../Layout';

class Purse extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <Layout>
        <PurseComponent />
      </Layout>
    );
  }
}

Purse.propTypes = {
  auth: PropTypes.shape(),
};

function mapStateToProps(state) {
  const {
    auth,
  } = state;
  return {
    auth,
  };
}

export default connect(mapStateToProps, {
})(Purse);
