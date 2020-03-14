import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import queryString from 'query-string';

import {
  getRateByID,
  putRateByID,
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
    } = this.props;
    const { rateId } = queryString.parse(location.search);
    getRateByID(rateId)
  }

  render() {
    const {
      rate,
      auth,
      putRateByID,
    } = this.props;

    return (
      <Layout>
        <MakeRateComponent
          rate={rate.selectRate}
          auth={auth}
          putRateByID={putRateByID}
        />
      </Layout>
    );
  }
}

MakeRate.propType = {
  auth: PropTypes.shape({}),
  rate: PropTypes.shape({}),
  getRateByID: PropTypes.finc,
  putRateByID: PropTypes.finc,
}

function mapStateToProps(state) {
  const {
    auth,
    rate,
  } = state;
  return {
    auth,
    rate,
  };
}

export default connect(mapStateToProps, {
  getRateByID,
  putRateByID,
})(MakeRate);
