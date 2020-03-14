import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import queryString from 'query-string';

import {
  Container,
} from 'react-bootstrap';

import Layout from '../Layout';

import {
  getCommonRates,
} from '../../actions';

import style from './style';

import RateCard from './components/RateCard';

class RateList extends React.Component {
  constructor(props) {
    super(props);

  }

  static async getInitialProps({ req, res, match, history, location, ...ctx }) {
    const {store} = ctx;
    if (store && store.dispatch) {
      const { userId } = req.query;
      if (userId) {
        await store.dispatch(getCommonRates(userId));
      } else {
        await store.dispatch(getCommonRates());
      }
    }
  }

  componentDidMount() {
    const { getCommonRates, location } = this.props;
    if (typeof getCommonRates === 'function') {
      const { userId } = queryString.parse(location.search);
      getCommonRates(userId || '');
    }
  }

  render() {
    const {
      rateList,
      classes,
      location,
    } = this.props;

    const { sort } = queryString.parse(location.search);

    return (
      <Layout>
        <Container className="justify-content-xs-center">
          <RateCard
            sort={sort}
            rateList={rateList && rateList.data}
          />
        </Container>
      </Layout>
    );
  }
}

RateList.propType = {
  getCommonRates: PropTypes.func,
  rateList: PropTypes.shape({})
}

function mapStateToProps(state) {
  const {
    auth,
    commonRate,
  } = state;
  return {
    auth,
    rateList: commonRate,
  };
}

export default injectSheet(style)(connect(mapStateToProps, {
  getCommonRates,
})(RateList));
