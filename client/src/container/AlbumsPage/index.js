import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ImageList from 'components/ImageList';

import Layout from '../Layout';

function AlbumsPage () {
  return (
    <Layout>
      <h1>Альбомы</h1>
      <ImageList />
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
