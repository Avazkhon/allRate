import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { Helmet } from "react-helmet";

import { Grid } from '@material-ui/core';

import {
  getRateByID,
  getBlockById,
  addCountViewsRate,
} from 'actions';

import Layout from '../Layout';

import RateCard from 'components/RateCard';
import CardsBlocks from 'components/CardsBlocks';
import Comments from '../../components/Comments';

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
    getrate(rateId)
    if (rateId) {
      addCountViewsRate(rateId)
      interval = setInterval(() => {
        getrate(rateId)
      }, 3000);
    }
    return () => clearInterval(interval);
  }, []);

  function getrate(rateId){
    getRateByID(rateId)
      .then((action) => {
        if (action.status === 'SUCCESS') {
          getBlockById(action.response.blockId)
        }
      })
  }

  return (
    <Layout>
      {
        selectRate.data && (
          <Helmet>
            {
              selectRate.data.title && (
                <title>{selectRate.data.title}</title>
              )
            }
            {
              selectRate.data.description && (
              <meta name="description" content={selectRate.data.description}/>
              )
            }
          </Helmet>
        )
      }
      <Grid item xs={12}>
        <RateCard
          selectRate={selectRate}
        />
      </Grid>
      <Grid item xs={12}>
        <CardsBlocks
          blocks={blocks}
          statusLife={selectRate.data && selectRate.data.statusLife}
        />
      </Grid>
      <Grid item xs={12}>
        <Comments
          commentsId={selectRate.data?.commentsId}
        />
      </Grid>
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
