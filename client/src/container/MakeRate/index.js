import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import queryString from 'query-string';

import {
  getRateByID,
  // postInvoice,
  // getPurse,
  // changeRatingRate,
  // addCountViewsRate,
} from 'actions';

import Layout from '../Layout';

import RateCard from 'components/RateCard';

function MakeRate (
  {
    selectRate,
    getRateByID,
    history,
  }
) {

  useEffect(() => {
    const { rateId } = queryString.parse(history.location.search);
    if (rateId) {
      getRateByID(rateId)
    }
  }, [])

  return (
    <Layout>
      <RateCard
        selectRate={selectRate}
      />
    </Layout>
  )
}
MakeRate.propTypes = {
  selectRate: PropTypes.shape(),
  history: PropTypes.shape(),
  getRateByID: PropTypes.func,

}

function mapStateToProps(state) {
  const {
    auth,
    selectRate,
    purse
  } = state;
  return {
    auth,
    selectRate,
    purse,
  };
}

export default connect(mapStateToProps, {
  getRateByID,
})(MakeRate);
