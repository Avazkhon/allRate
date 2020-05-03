import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


import {
  Container,
  Row,
  Col,
  Card,
  Button,
} from 'react-bootstrap';

import {
  getUsers,
} from 'actions';

import SiteBar from 'components/SiteBar';
import CardUsers from 'components/CardUsers';
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
      users: {
        data: users,
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
            <CardUsers

            />
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
  users: PropTypes.shape({}),
  auth: PropTypes.shape({}),
}

function mapStateToProps(state) {
  const {
    auth,
    users,
  } = state;
  return {
    auth,
    users
  };
}

export default connect(mapStateToProps, {
  getUsers,
})(Home);
