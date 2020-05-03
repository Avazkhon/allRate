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
  getSubscriptions,
} from 'actions';

import SiteBar from 'components/SiteBar';
import CardUsers from 'components/CardUsers';
import Layout from '../Layout';

import {
  getDataUserFromLocalStorag,
} from 'utils';

class Home extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    const {
      getUsers,
      getSubscriptions,
    } = this.props;
    getUsers();
    const user = getDataUserFromLocalStorag();
    console.log(user);
    if (user && user.userId) {
      getSubscriptions(user.userId);
    }
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
  getUsers: PropTypes.func,
  getSubscriptions: PropTypes.func,
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
  getSubscriptions,
})(Home);
