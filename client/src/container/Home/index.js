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
  getAllNews,
  getSubscriptions,
} from 'actions';

import MyList from 'components/MyList';
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
      getAllNews,
      getSubscriptions,
    } = this.props;
    getUsers();
    getAllNews();
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
      users: {
        data: users,
      },
      myList,
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
            <MyList
              myList={myList.data ? myList.data : []}
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
  getAllNews: PropTypes.func,
  getSubscriptions: PropTypes.func,
  users: PropTypes.shape({}),
  auth: PropTypes.shape({}),
  myList: PropTypes.shape({}),
}

function mapStateToProps(state) {
  const {
    auth,
    users,
    myList,
  } = state;
  return {
    auth,
    users,
    myList,
  };
}

export default connect(mapStateToProps, {
  getUsers,
  getAllNews,
  getSubscriptions,
})(Home);
