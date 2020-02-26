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
          <div className="rate-list__hedaer">
            <span>Список ставок</span>
          </div>
          <div className="rate-list__content">
            <ul className="rate-list__items">
              {
                rateList.data && rateList.data.map((rate) => {
                  return (
                    <li
                      key={rate._id}
                      className="rate-item"
                    >
                      <div className="rate-item_header">
                        <span>{rate.title}</span>
                      </div>
                      <div className="rate-item_content">
                        <div className="rate-item_description">
                          <div><span>Описание</span></div>
                          <div className="rate-item_description-text">
                            <p>{rate.description}</p>
                          </div>
                        </div>
                        <div className="rate-item_party">
                          <div><span>Список участников</span></div>
                          <div>
                            <ul>
                              {
                                rate.party.map((itm) => {
                                  return (
                                    <li
                                      key={itm._id}
                                      className="item-party"
                                    >
                                      <div className="item-party_header">
                                        <span>{rate.title}</span>
                                      </div>
                                      <div className="item-party_description">
                                        <div className="item-party_description-text">
                                          <p>{rate.description}</p>
                                        </div>
                                      </div>
                                    </li>
                                  )
                                })
                              }
                            </ul>
                          </div>
                        </div>
                        <div className="rate-item_rates">
                          <div><span>Список ставок</span></div>
                          <p>rates</p>
                        </div>
                      </div>
                      <div className="rate-item_footer">
                        <span className="rate-item_date">{rate.serverTime}</span>
                        <span className="rate-item_date">{rate.dateStart}</span>
                        <span className="rate-item_date">{rate.dateFinish}</span>
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
