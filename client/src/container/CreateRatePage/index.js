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
  changeImg,
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

  render() {
    const {
      creteNewRate,
      auth,
      selectRate,
      changeImg,
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
                rate={selectRate}
                titleFrom="Создание меню"
                creteNewRate={creteNewRate}
                changeImg={changeImg}
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
  changeImg: PropTypes.func,
  auth: PropTypes.shape({}),
}

function mapStateToProps(state) {
  const {
    auth,
    selectRate,
  } = state;
  return {
    auth,
    selectRate,
  };
}

export default connect(mapStateToProps, {
  creteNewRate,
  changeImg,
})(CreateRatePAge);
