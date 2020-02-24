import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './style.css';

import Layout from '../layout';

import {
  getRateByID,
} from '../../actions'

import {
  isFunction,
} from '../../utils';

class CardRate extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount () {
    const { getRateByID } = this.props;
    const { id } = this.props.match.params;
    isFunction(getRateByID) && getRateByID(id);
  }

  render() {
    const { rate } = this.props;
    return (
      <Layout>
        <div>
          {
            rate &&
            <div>
              <div>
                <span>Название</span>
                <div>
                  <span>{rate.title}</span>
                </div>
              </div>
              <div>
                <span>Описание</span>
                <div>
                  <span>{rate.description}</span>
                </div>
              </div>
              <div>
                <ul>
                  {
                    rate.party && rate.party.map((itm) => (
                      <li key={itm._id}>
                        <div>Участник: {itm.participator}</div>
                        <div>
                          Описание
                          <div>
                            <p>{itm.description}</p>
                          </div>
                        </div>
                      </li>
                    ))
                  }
                </ul>
              </div>
              <div>
                <div>
                  <span>{`Дата создание: ${rate.localTime}`}</span>
                </div>
                <div>
                  <span>{`Дата началы: ${rate.dateStart}`}</span>
                </div>
                <div>
                  <span>{`Дата оканичание: ${rate.dateFinish}`}</span>
                </div>
              </div>
            </div>
          }
        </div>
      </Layout>
    );
  }
}

CardRate.propType = {
  getRateByID: PropTypes.func,
}

const mapStateToprops = ({
  rate
}) => ({
  rate: rate.selectRate,
})

export default connect(mapStateToprops, {
  getRateByID,
})(CardRate);
