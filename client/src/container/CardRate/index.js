import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './style.css';

import Layout from '../layout';

class CardRate extends Component {
  constructor(props) {
    super(props);
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
  // authRegistration: PropTypes.func,
}

export default CardRate;
