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
    return (
      <Layout>
        <div>
          CardRate
        </div>
      </Layout>
    );
  }
}

CardRate.propType = {
  getRateByID: PropTypes.func,
}

const mapStateToprops = ({

}) => ({

})

export default connect(mapStateToprops, {
  getRateByID,
})(CardRate);
