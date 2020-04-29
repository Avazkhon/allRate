import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';

import RateForm from 'components/RateForm';
import SiteBar from 'components/SiteBar';

import Layout from '../Layout';


import {
  getRateByID,
  putRateByID,
  putRateLiveByID,
  putRateSelectVictory,
} from '../../actions';

class CardRate extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   data: null
    // }
  }
  componentDidMount() {
    const {
      match: { params: { id } },
      getRateByID,
    } = this.props;
    getRateByID(id);
  }

  render() {
    const {
      getRateByID,
      putRateByID,
      putRateLiveByID,
      putRateSelectVictory,
      auth,
      selectRate,
    } = this.props;

    return (
      <Layout>
        <Row>
          <Col xs="12"  sm="4" md="3">
            <SiteBar
              userId={auth && auth.userId}
            />
          </Col>
          <Col xs="12" sm="8" md="9">
            <RateForm
              rate={selectRate}
              getRateByID={getRateByID}
              putRateByID={putRateByID}
              putRateLiveByID={putRateLiveByID}
              putRateSelectVictory={putRateSelectVictory}
              titleFrom="Карточка ставки"
            />
          </Col>
        </Row>
      </Layout>
    );
  }
}

CardRate.propType = {
  getRateByID: PropTypes.func,
  putRateByID: PropTypes.func,
  putRateLiveByID: PropTypes.func,
  putRateSelectVictory: PropTypes.func,
  selectRate: PropTypes.shape({}),
}

function mapStateToProps(state) {
  const {
    auth,
    selectRate
  } = state;
  return {
    auth,
    selectRate,
  };
}

export default connect(mapStateToProps, {
  getRateByID,
  putRateByID,
  putRateLiveByID,
  putRateSelectVictory,
})(CardRate);
