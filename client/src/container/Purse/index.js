import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';

import PurseComponent from 'components/PurseComponent';

import Layout from '../Layout';

class Purse extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <Layout>
        <Container>
          <PurseComponent />
        </Container>
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
