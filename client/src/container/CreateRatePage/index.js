import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import {
  Row,
  Col,
  Container,
} from 'react-bootstrap';

import {
  creteNewRate,
} from 'actions'

import RateForm from 'components/RateForm';
import SiteBar from 'components/SiteBar';

import Layout from '../Layout';

class CreateRatePAge extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //   }
  // }

  // componentDidMount() {
  // }


  render() {
    const {
      creteNewRate,
      auth,
    } = this.props;
    const { userId } = auth.auth ? auth.auth : {};
    return (
      <Layout>
        <Container>
          <Row>
            <Col xs="12" sm="3">
              <SiteBar
                userId={userId}
              />
            </Col>
            <Col xs="12" sm="9">
              <RateForm
                titleFrom="Создание меню"
                creteNewRate={creteNewRate}
              />
            </Col>
          </Row>
        </Container>
      </Layout>
    );
  }
}

CreateRatePAge.propType = {
  creteNewRate: PropTypes.func,
  auth: PropTypes.shape({})
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
  creteNewRate,
})(CreateRatePAge);
