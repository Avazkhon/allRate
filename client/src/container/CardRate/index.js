import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './style.css';

import Layout from '../layout';

class CardRate extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount () {
    const { id } = this.props.match.params;
    console.log(id);
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
