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
      putRateByID,
      auth,
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
              getRateByID={getRateByID}
              putRateByID={putRateByID}
              rateId={this.props.match.params.id}
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
  putRateByID,
})(CardRate);
