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
import CardsRates from 'components/CardsRates';

function MePage ({
  auth,
  posts,
  rates,
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
              userData={auth.userData}
            />
          </Col>
          <Col xs="12" sm="8" md="9">
            <ProfileUser
              profileId={userId}
            />
            <UserBtnGroup />
            {
              (content === 'my_posts' || !content) &&
              <CardsPosts
                userId={userId}
                posts={posts}
                history={history}
              />
            }
            {
              (content === 'subscribtion_posts') &&
              <CardsPosts
                userId={userId}
                posts={posts}
                history={history}
              />
            }
            {
              (content === 'subscribtion_rates') &&
              <CardsRates
                userId={userId}
                rates={rates}
                history={history}
              />
            }
            {
              (content === 'my_rates') &&
              <CardsRates
                userId={userId}
                rates={rates}
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
  rates: PropTypes.shape(),
  history: PropTypes.shape(),
}

function mapStateToProps(state) {
  const {
    auth,
    posts,
    rate,
  } = state;
  return {
    auth,
    posts,
    rates: rate
  };
}

export default connect(mapStateToProps, {})(MePage);
