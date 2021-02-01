import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  Grid
} from '@material-ui/core';

import Layout from '../Layout';
import Support from './Support';

function Help({ auth }) {
  return (
    <Layout>
      <Grid container>
        <Grid item xs={12}>
          <Support auth={auth} />
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
