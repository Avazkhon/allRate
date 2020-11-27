import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import queryString from 'query-string';

import {
  getRateByID,
  postInvoice,
  getPurse,
  changeRatingRate,
  addCountViewsRate,
} from 'actions';

import Layout from '../Layout';

import MakeRateComponent from 'components/MakeRateComponent';

class MakeRate extends Component {
  constructor(props) {
    super(props);

  }
  componentDidMount(){
    const {
      location,
      getRateByID,
      getPurse,
      addCountViewsRate,
    } = this.props;
    const { rateId } = queryString.parse(location.search);
    getRateByID(rateId);
    getPurse();
    addCountViewsRate(rateId)
  }

  render() {
    const {
      selectRate,
      auth,
      purse,
      postInvoice,
      getRateByID,
      getPurse,
      changeRatingRate,
    } = this.props;

    return (
      <Layout>
        <MakeRateComponent
          rate={selectRate}
          auth={auth}
          purse={purse}
          postInvoice={postInvoice}
          getRateByID={getRateByID}
          getPurse={getPurse}
          changeRatingRate={changeRatingRate}
        />
      </Layout>
    );
  }
}

MakeRate.propTypes = {
  auth: PropTypes.shape({}),
  location: PropTypes.shape(),
  selectRate: PropTypes.shape({}),
  purse: PropTypes.shape({}),
  getRateByID: PropTypes.func,
  postInvoice: PropTypes.func,
  getPurse: PropTypes.func,
  addCountViewsRate: PropTypes.func,
  changeRatingRate: PropTypes.func,
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
  postInvoice,
  getPurse,
  changeRatingRate,
  addCountViewsRate,
})(MakeRate);
