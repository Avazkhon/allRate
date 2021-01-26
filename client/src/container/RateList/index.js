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

import CardsRates from 'components/CardsRates/indexNew';
import SearchRateForm from 'components/SearchRateForm';

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
      rates,
      history,
    } = this.props;

    return (
      <Layout>
        <Container className="justify-content-xs-center">
          <SearchRateForm />
          <CardsRates
            rates={rates}
            history={history}
          />
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
