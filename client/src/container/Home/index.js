import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';

import {
  getUsers,
} from 'actions';

import SiteBar from 'components/SiteBar';
import Layout from '../Layout';

class Home extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    const { getUsers } = this.props;
    getUsers();
  }

  render() {
    const {
      auth: {
        auth
      },
    } = this.props;
    return (
      <Layout>
      <Container>
        <Row>
          <Col xs="12"  sm="4" md="3">
            <SiteBar
              userId={auth && auth.userId}
            />
          </Col>
          <Col xs="12" sm="8" md="9">
            Home
          </Col>
        </Row>
      </Container>
      </Layout>
    );
  }
}

Home.propType = {
  // authRegistration: PropTypes.func,
  // createNewUser: PropTypes.func,
  // authoLogin: PropTypes.func,
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
  getUsers,
})(Home);
