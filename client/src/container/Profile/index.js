import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import queryString from 'query-string';
import injectSheet from 'react-jss';

import {
  Container,
  Row,
  Col,
  Spinner,
} from 'react-bootstrap';

import Layout from 'container/Layout';
import ProfileUser from 'components/ProfileUser';
import UserBtnGroup from 'components/UserBtnGroup';
import CardsPosts from 'components/CardsPosts';
import CardsRates from 'components/CardsRates';

import style from './style';

function MePage ({
  posts,
  rates,
  history,
  match: { params: { id: userId } },
  classes,
}) {
  const { content } = queryString.parse(history.location.hash);
  const isFetching = posts.isFetching || rates.isFetching;

  return (
    <Layout>
      <Container>
        <Row>
          <Col xs="12" sm="8" md="9">
            <ProfileUser
              profileId={userId}
            />
            <UserBtnGroup />

            {
              ((content === 'my_posts' || !content) && <h3 className={classes['title-list']}>Посты пользователя</h3>)
              || (content === 'subscribtion_posts' && <h3 className={classes['title-list']}>Подписки на посты</h3>)
              || (content === 'my_rates' && <h3 className={classes['title-list']}>Ставки пользователя</h3>)
              || (content === 'subscribtion_rates' && <h3 className={classes['title-list']}>Подписки на ставки</h3>)
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
  match: PropTypes.shape(),
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
