import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ImageList from 'components/ImageList';

import Layout from '../Layout';
import { Container } from '@material-ui/core';

function AlbumsPage ({ auth }) {
  return (
    <Layout>
      <Container>
        <h1>Альбомы</h1>
        <ImageList />
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
