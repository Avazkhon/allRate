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

import {
  getMyList,
} from 'actions';

import Layout from 'container/Layout';
import ProfileUser from 'components/ProfileUser';
import SiteBar from 'components/SiteBar';
import UserBtnGroup from 'components/UserBtnGroup';
import MyList from 'components/MyList';

class MePage extends React.Component {
  // constructor(props) {
  //   super(props);
  //
  // }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {
      getMyList,
      auth: {
        auth,
      }
    } = this.props;

    if (
      (auth && prevProps.auth.auth && (prevProps.auth.auth.userId !== auth.userId))
      || auth && auth.userId && prevProps.auth && !prevProps.auth.auth
    ) {
      getMyList(auth.userId);
    }
  }

  render() {
    const {
      auth,
      myList,
    } = this.props;
    const userId = auth.auth && auth.auth.userId;
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
              <ProfileUser />
              <UserBtnGroup />
              <MyList
                myList={myList}
              />
            </Col>
          </Row>
        </Container>
      </Layout>
    );
  }
}

MePage.propType = {
  auth: PropTypes.shape({}),
  getMyList: PropTypes.func,
}

function mapStateToProps(state) {
  const {
    auth,
    myList,
  } = state;
  return {
    auth,
    myList,
  };
}

export default connect(mapStateToProps, {
  getMyList,
})(MePage);
