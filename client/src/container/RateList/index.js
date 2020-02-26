import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { Link } from "react-router-dom";

import Layout from '../layout';

import {
  getCommonRates,
} from '../../actions';

import './style.css';

class RateList extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    const { getCommonRates } = this.props;
    if (typeof getCommonRates === 'function') {
      getCommonRates();
    }
  }

  render() {
    const {
      rateList,
    } = this.props;
    return (
      <Layout>
        <div className="rate-list">
          <div>
            <ul>
              {
                rateList.data && rateList.data.map((rate) => {
                  return (
                    <li key={rate._id}>
                      <div>
                        <span>{rate.title}</span>
                      </div>
                    </li>
                  );
                })
              }
            </ul>
          </div>
        </div>
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

export default connect(mapStateToProps, {
  getCommonRates,
})(RateList);
