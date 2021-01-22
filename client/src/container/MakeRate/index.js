import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import queryString from 'query-string';

import {
  getRateByID,
  getBlockById,
  // putBlockById,
  // postInvoice,
  // getPurse,
  // changeRatingRate,
  addCountViewsRate,
} from 'actions';

import Layout from '../Layout';

import RateCard from 'components/RateCard';
import CardsBlocks from 'components/CardsBlocks';

function MakeRate (
  {
    selectRate,
    getRateByID,
    getBlockById,
    history,
    blocks,
    addCountViewsRate,
  }
) {

  useEffect(() => {
    const { rateId } = queryString.parse(history.location.search);
    let interval;
    if (rateId) {
      addCountViewsRate(rateId)
      interval = setInterval(() => {
          getRateByID(rateId)
            .then((action) => {
              if (action.status === 'SUCCESS') {
                getBlockById(action.response.blockId)
              }
            })
      }, 3000);
    }
    return () => clearInterval(interval);
  }, []);

  return (
    <Layout>
      <RateCard
        selectRate={selectRate}
      />
      <CardsBlocks
        blocks={blocks}
        statusLife={selectRate.data && selectRate.data.statusLife}
      />
    </Layout>
  )
}
MakeRate.propTypes = {
  selectRate: PropTypes.shape(),
  history: PropTypes.shape(),
  blocks: PropTypes.shape(),
  getRateByID: PropTypes.func,
  getBlockById: PropTypes.func,
  addCountViewsRate: PropTypes.func,
}

function mapStateToProps(state) {
  const {
    auth,
    selectRate,
    purse,
    blocks,
  } = state;
  return {
    auth,
    selectRate,
    purse,
    blocks,
  };
}

export default connect(mapStateToProps, {
  getRateByID,
  getBlockById,
  addCountViewsRate,
})(MakeRate);
