import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';

import {
  getPostsPage,
} from 'actions';

import Layout from 'container/Layout';
import ProfileUser from 'components/ProfileUser';
import SiteBar from 'components/SiteBar';
import UserBtnGroup from 'components/UserBtnGroup';
import CardsPosts from 'components/CardsPosts';

class MePage extends React.Component {
  // constructor(props) {
  //   super(props);
  //
  // }

  componentDidUpdate(prevProps) {
    const {
      getPostsPage,
      auth: {
        auth,
      }
    } = this.props;

    if (
      (auth && prevProps.auth.auth && (prevProps.auth.auth.userId !== auth.userId))
      || auth && auth.userId && prevProps.auth && !prevProps.auth.auth
    ) {
      getPostsPage({ page: 1, limit: 3, authorId: auth.userId});
    }
  }

  render() {
    const {
      auth,
      posts,
      history,
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
              <CardsPosts
                history={history}
                posts={posts}
              />
            </Col>
          </Row>
        </Container>
      </Layout>
    );
  }
}

MePage.propTypes = {
  auth: PropTypes.shape(),
  posts: PropTypes.shape(),
  getPostsPage: PropTypes.func,
}

function mapStateToProps(state) {
  const {
    auth,
    posts,
  } = state;
  return {
    auth,
    posts
  };
}

export default connect(mapStateToProps, {
  getPostsPage,
})(MePage);
