import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import queryString from 'query-string';

import {
  getRateByID,
  postInvoice,
  getPurse,
} from 'actions';

import Layout from '../Layout';

import MakeRateComponent from './MakeRateComponent';

class MakeRate extends Component {
  constructor(props) {
    super(props);

  }
  componentDidMount(){
    const {
      location,
      getRateByID,
      getPurse,
    } = this.props;
    const { rateId } = queryString.parse(location.search);
    getRateByID(rateId)
    getPurse()
  }

  render() {
    const {
      selectRate,
      auth,
      purse,
      postInvoice,
    } = this.props;

    return (
      <Layout>
        <MakeRateComponent
          rate={selectRate.data}
          auth={auth}
          purse={purse}
          postInvoice={postInvoice}
        />
      </Layout>
    );
  }
}

MakeRate.propType = {
  auth: PropTypes.shape({}),
  selectRate: PropTypes.shape({}),
  purse: PropTypes.shape({}),
  getRateByID: PropTypes.finc,
  postInvoice: PropTypes.finc,
  getPurse: PropTypes.finc,
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
})(MakeRate);
