import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import injectSheet from 'react-jss';

import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';

import Layout from 'container/Layout';
import ProfileUser from 'components/ProfileUser';
import SiteBar from 'components/SiteBar';

class Profile extends React.Component {
  // constructor(props) {
  //   super(props);
  //
  // }

  render() {
    const {
      auth,
    } = this.props;
    const userId = auth.auth && auth.auth.userId;
    const { match: { params: { id } } } = this.props;

    return (
      <Layout>
        <Container>
          <Row>
            <Col xs="12"  sm="4" md="3">
              <SiteBar
                userId={userId}
              />
            </Col>
            <Col xs="12" sm="8" md="9">
              <ProfileUser
                profileId={id}
              />
            </Col>
          </Row>
        </Container>
      </Layout>
    );
  }
}

Profile.propType = {
  auth: PropTypes.shape({}),
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
})(Profile);
