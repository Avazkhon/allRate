import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import queryString from 'query-string';

import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';

import Layout from '../Layout';

import {
  getRatesPage,
} from '../../actions';

import style from './style';

import SiteBar from 'components/SiteBar';
import CardsRates from 'components/CardsRates';

class RateList extends React.Component {
  constructor(props) {
    super(props);

  }

  // static async getInitialProps({ req, res, match, history, location, ...ctx }) {
  //   const {store} = ctx;
  //   if (store && store.dispatch) {
  //     const { userId } = req.query;
  //     if (userId) {
  //       await store.dispatch(getCommonRates(userId));
  //     } else {
  //       await store.dispatch(getCommonRates());
  //     }
  //   }
  // }

  render() {
    const {
      // classes,
      auth,
      rates,
      history,
    } = this.props;

    return (
      <Layout>
        <Container className="justify-content-xs-center">
          <Row>
            <Col xs="12"  sm="4" md="3">
              <SiteBar
                userId={auth && auth.userId}
              />
            </Col>
            <Col xs="12"  sm="8" md="9">
              <CardsRates
                userId={auth && auth.userId}
                rates={rates}
                history={history}
              />
            </Col>
          </Row>
        </Container>
      </Layout>
    );
  }
}

RateList.propTypes = {
  getRatesPage: PropTypes.func,
  rates: PropTypes.shape(),
  location: PropTypes.shape(),
  auth: PropTypes.shape(),
  history: PropTypes.shape(),
}

function mapStateToProps(state) {
  const {
    auth,
    rate,
  } = state;
  return {
    auth,
    rates: rate,
  };
}

export default injectSheet(style)(connect(mapStateToProps, {
  getRatesPage,
})(RateList));
