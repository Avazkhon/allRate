import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  Grid
} from '@material-ui/core';

import Layout from '../Layout';

function Help({ auth }) {
  console.log(auth);
  return (
    <Layout>
      <Grid container>
        <Grid item>
          Help
        </Grid>
      </Grid>
    </Layout>
  );
}

Help.propTypes = {
  auth: PropTypes.shape(),
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
)(Help);
