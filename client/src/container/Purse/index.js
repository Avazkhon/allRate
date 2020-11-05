import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';

import SiteBar from 'components/SiteBar';
import PurseComponent from 'components/PurseComponent';

import Layout from '../Layout';

class Purse extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    const {
      auth: {
        userData,
      },
    } = this.props;
    return (
      <Layout>
        <Container>
          <Row>
            <Col xs="12"  sm="4" md="3">
              <SiteBar
                userData={userData}
              />
            </Col>
            <Col xs="12" sm="8" md="9">
              <PurseComponent />
            </Col>
          </Row>
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
