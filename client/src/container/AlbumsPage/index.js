import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Albums } from 'components/Albums';

import Layout from '../Layout';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    // backgroundColor: theme.palette.background.paper,
  },

}));

function AlbumsPage ({ auth }) {
  const classes = useStyles();
  return (
    <Layout>
      <Container>
        <h1>Альбомы</h1>
        <Albums />
      </Container>
    </Layout>
  );
}

AlbumsPage.propTypes = {
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
)(AlbumsPage);
