import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import queryString from 'query-string';
import injectSheet from 'react-jss';

import {
  Row,
  Col,
  Spinner,
} from 'react-bootstrap';

import {
  getDataUserFromLocalStorag,
} from 'utils';

import Layout from 'container/Layout';
import ProfileUser from 'components/ProfileUser';
import UserBtnGroup from 'components/UserBtnGroup';
import CardsPosts from 'components/CardsPosts';
import CardsRates from 'components/CardsRates';

import style from './style';

function MePage ({
  auth,
  posts,
  rates,
  history,
  classes,
}) {
  let userId = '';
  if (auth.auth && auth.auth.userId) {
    userId = auth.auth.userId;
  } else {
    const userFromLocalStage = getDataUserFromLocalStorag();
    userId = userFromLocalStage && userFromLocalStage.userId;
  }
  const { content } = queryString.parse(history.location.hash);

  const isFetching = posts.isFetching || rates.isFetching;
  return (
    <Layout>
      <ProfileUser
        profileId={userId}
        isPageAuth
      />
      <UserBtnGroup isPageAuth />
      {
        ((content === 'my_posts' || !content) && <h3 className={classes['title-list']}>Мой посты</h3>)
        || (content === 'subscribtion_posts' && <h3 className={classes['title-list']}>Подписки на посты</h3>)
        || (content === 'subscribtion_rates' && <h3 className={classes['title-list']}>Подписки на ставки</h3>)
        || (content === 'my_rates' && <h3 className={classes['title-list']}>Мой ставки</h3>)
      }

      { isFetching &&
        <Row className="justify-content-md-center">
          <Col xs={{ span: 6, offset: 5 }} sm={{ span: 8, offset: 5 }} md={{ span: 9, offset: 8 }}>
            <Spinner animation="border" variant="primary" />
          </Col>
        </Row>
      }
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
    </Layout>
  );
}

MePage.propTypes = {
  auth: PropTypes.shape(),
  posts: PropTypes.shape(),
  rates: PropTypes.shape(),
  history: PropTypes.shape(),
  classes: PropTypes.shape(),
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

export default injectSheet(style)(
  connect(mapStateToProps, {})(MePage)
)
