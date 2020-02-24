import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './style.css';

import Party from './components/Party';

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
              {
                rate.party &&
                <Party
                  party={rate.party}
                />
              }
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
  rate: PropTypes.shape({}),
}

const mapStateToprops = ({
  rate
}) => ({
  rate: rate.selectRate,
})

export default connect(mapStateToprops, {
  getRateByID,
})(CardRate);
