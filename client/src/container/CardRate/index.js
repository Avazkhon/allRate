import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import Layout from '../layout';

import RateForm from '../../components/RateForm';

import {
  getRateByID,
} from '../../actions';


import './style.css';

class CardRate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    }
  }

  render() {
    const {
      getRateByID,
    } = this.props;
    return (
      <Layout>
        <div className="create-rate">
          <RateForm
            getRateByID={getRateByID}
            rateId={this.props.match.params.id}
            titleFrom="Карточка ставки"
          />
        </div>
      </Layout>
    );
  }
}

CardRate.propType = {
  getRateByID: PropTypes.func,
}

function mapStateToProps(state) {
  const {
    auth,
  } = state;
  return {
    auth,
  };
}

export default connect(mapStateToProps, {
  getRateByID,
})(CardRate);
