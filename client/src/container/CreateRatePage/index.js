import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import queryString from 'query-string';

import {
  Row,
  Col,
  Container,
} from 'react-bootstrap';

import {
  // creteNewRate,
  changeImg,
  getRateByID,
} from 'actions'

import FormRate from 'components/FormRate';
import FormBlocks from 'components/FormBlocks';

import Layout from '../Layout';

function CreateRatePage ({
  history,
  selectRate,
  blocks,
  getRateByID
}) {
  const { rateId } = queryString.parse(history.location.search);

  const [{
    isShowRate,
    blockId,
  },
  changeData,
] = useState({
    isShowRate: false,
    blockId: null,
})

  useEffect(() => {
    updateRateEndBlocks()
  }, [])


  function updateRateEndBlocks () {
      if (rateId) {
        getRateByID(rateId)
          .then((action) => {
            if (action.status === 'SUCCESS') {
              changeData({
                isShowRate: true,
                blockId: action.response.blockId,
              })
            }
          });
      }
  }

  return (
    <Layout>
      <Container style={{marginTop: '40px'}}>
        <FormRate
          selectRate={isShowRate ? selectRate : {}}
          paymentPercentage={blocks.data.paymentPercentage}
        />
        <FormBlocks
          rateId={rateId}
          blockId={blockId}
          statusLife={selectRate.data && selectRate.data.statusLife}
        />
      </Container>
    </Layout>
  );
}

CreateRatePage.propTypes = {
  // creteNewRate: PropTypes.func,
  changeImg: PropTypes.func,
  getRateByID: PropTypes.func,
  selectRate: PropTypes.shape(),
  auth: PropTypes.shape(),
  history: PropTypes.shape(),
  blocks: PropTypes.shape(),
}

function mapStateToProps(state) {
  const {
    auth,
    selectRate,
    blocks
  } = state;
  return {
    auth,
    selectRate,
    blocks,
  };
}

export default connect(mapStateToProps, {
  // creteNewRate,
  changeImg,
  getRateByID,
})(CreateRatePage);
