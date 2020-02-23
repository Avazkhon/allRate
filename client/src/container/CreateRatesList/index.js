import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './style.css';
import Layout from '../layout';

import {
  getRates,
} from '../../actions';


class CreateRatesList extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    const { auth, rate, getRates} = this.props;
    getRates(auth && auth.auth && auth.auth.userId);
  }

  render() {
    const { rate: { ratesData } } = this.props;
    return (
      <Layout>
        <div className="create-rates-list">
          <div className="create-rates-list__container">
            <div className="create-rates-list_title">Список вами созданных ставок</div>
            <ul className="create-rates-list_rates">
              {
                ratesData && ratesData.map((rate) => (
                  <li
                    key={rate._id}
                    className="create-rates-item_rate"
                  >
                    <div className="create-rates-item_header">
                      <span>{rate.title}</span>
                    </div>
                    <div className="create-rates-item__content">
                      <div>
                        <span className="create-rates-item_content-title">Описание</span>
                        <div className="create-rates-item_content_content">
                          <span className="create-rates-item_content_text">{rate.description}</span>
                        </div>
                      </div>
                      <div className="party">
                        <div className="party_title"><span>Список сторон</span></div>
                        <ul className="party__list">
                          {
                            rate.party && rate.party.map((itm) => (
                              <li
                                key={itm._id}
                                className="party_itm"
                              >
                                {itm.participator}
                              </li>
                            ))
                          }
                        </ul>
                      </div>
                    </div>
                    <div className="create-rates-item_footer">
                      <span>Дата создание</span>
                      <div><span>{rate.localTime}</span></div>
                    </div>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
      </Layout>
    );
  }
}

CreateRatesList.propType = {
  // authRegistration: PropTypes.func,
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
  getRates,
})(CreateRatesList);
