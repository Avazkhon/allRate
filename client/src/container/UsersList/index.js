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
  getSubscriptions,
} from 'actions';

import SiteBar from 'components/SiteBar';
import CardUsers from 'components/CardUsers';
import Layout from '../Layout';

import {
  getDataUserFromLocalStorag,
} from 'utils';

class UsersList extends React.Component {
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
    if (user && user.userId) {
      getSubscriptions(user.userId);
    }
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
            <CardUsers />
          </Col>
        </Row>
      </Container>
      </Layout>
    );
  }
}

UsersList.propTypes = {
  getUsers: PropTypes.func,
  getSubscriptions: PropTypes.func,
  users: PropTypes.shape(),
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

export default connect(mapStateToProps, {
  getUsers,
  getSubscriptions,
})(UsersList);
