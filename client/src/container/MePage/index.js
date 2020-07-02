import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import queryString from 'query-string';

import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';

import Layout from 'container/Layout';
import ProfileUser from 'components/ProfileUser';
import SiteBar from 'components/SiteBar';
import UserBtnGroup from 'components/UserBtnGroup';
import CardsPosts from 'components/CardsPosts';

function MePage ({
  auth,
  posts,
  history,
}) {
  const userId = auth.auth && auth.auth.userId;
  const { content } = queryString.parse(history.location.hash);

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
            {
              (content === 'my_posts' || !content) &&
              <CardsPosts
                userId={userId}
                posts={posts}
                history={history}
              />
            }
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

MePage.propTypes = {
  auth: PropTypes.shape(),
  posts: PropTypes.shape(),
  history: PropTypes.shape(),
}

function mapStateToProps(state) {
  const {
    auth,
    posts,
  } = state;
  return {
    auth,
    posts,
  };
}

export default connect(mapStateToProps, {})(MePage);
