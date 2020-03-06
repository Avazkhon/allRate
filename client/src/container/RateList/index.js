import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import injectSheet from 'react-jss';

import Layout from '../layout';

import {
  getCommonRates,
} from '../../actions';

import style from './style';

import PartyList from './components/PartyList';

class RateList extends React.Component {
  constructor(props) {
    super(props);

  }

  static async getInitialProps({ req, res, match, history, location, ...ctx }) {
    const {store} = ctx;
    await store.dispatch(getCommonRates());
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
      classes
    } = this.props;
    return (
      <Layout>
        <div className={classes['rate-list']}>
          <div className={classes['rate-list__hedaer']}>
            <span>Список ставок</span>
          </div>
          <div className={classes['rate-list__content']}>
            <ul className={classes['rate-list__items']}>
              {
                rateList.data && rateList.data.map((rate) => {
                  return (
                    <li
                      key={rate._id}
                      className={classes['rate-item']}
                    >
                      <Link to={`card-rate/${rate._id}`}>
                        <div className={classes['rate-item_header']}>
                          <span>{rate.title}</span>
                        </div>
                        <div className={classes['rate-item_content']}>
                          <div className={classes['rate-item_description']}>
                            <div><span>Описание</span></div>
                            <div className={classes['rate-item_description-text']}>
                              <p>{rate.description}</p>
                            </div>
                          </div>

                          <PartyList
                            party={rate.party}
                          />

                          <div className={classes['rate-item_rates']}>
                            <div><span>Список ставок</span></div>
                            <p>rates</p>
                          </div>
                        </div>
                        <div className={classes['rate-item_footer']}>
                          <span className={classes['rate-item_date']}>{rate.serverTime}</span>
                          <span className={classes['rate-item_date']}>{rate.dateStart}</span>
                          <span className={classes['rate-item_date']}>{rate.dateFinish}</span>
                        </div>
                      </Link>
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

export default injectSheet(style)(connect(mapStateToProps, {
  getCommonRates,
})(RateList));
