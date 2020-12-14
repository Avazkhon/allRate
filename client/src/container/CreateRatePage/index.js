import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import queryString from 'query-string';

import {
  Row,
  Col,
  Container,
} from 'react-bootstrap';

import {
  // creteNewRate,
  changeImg,
  getRateByID,
  getBlockById,
} from 'actions'

import FormRate from 'components/FormRate';
import SiteBar from 'components/SiteBar';
import FormBlocks from 'components/FormBlocks';

import Layout from '../Layout';

class CreateRatePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowRate: false,
    }
  }

  componentDidMount() {
    const {
      history,
      getRateByID,
      getBlockById,
    } = this.props;
    const { rateId } = queryString.parse(history.location.search);
    if (rateId) {
      getRateByID(rateId)
        .then((action) => {
          if (action.status === 'SUCCESS') {
            if (action.response.blockId) {
              getBlockById(action.response.blockId)
            }
            this.setState({isShowRate: true})
          }
        });
    }
  }

  render() {
    const {
      isShowRate,
    } = this.state;
    const {
      // creteNewRate,
      auth: {
        userData
      },
      selectRate,
      changeImg,
      blocks,
    } = this.props;

    return (
      <Layout>
        <Container>
          <Row>
            <Col xs="12" sm="3">
              <SiteBar
                userData={userData}
              />
            </Col>
            <Col xs="12" sm="9">
              <FormRate
                selectRate={isShowRate && selectRate}
              />
              <FormBlocks
                blocks={blocks}
              />
            </Col>
          </Row>
        </Container>
      </Layout>
    );
  }
}

CreateRatePage.propTypes = {
  // creteNewRate: PropTypes.func,
  changeImg: PropTypes.func,
  getRateByID: PropTypes.func,
  getBlockById: PropTypes.func,
  selectRate: PropTypes.shape(),
  auth: PropTypes.shape(),
  history: PropTypes.shape(),
  blocks: PropTypes.shape(),
}

function mapStateToProps(state) {
  const {
    auth,
    selectRate,
    blocks
  } = state;
  return {
    auth,
    selectRate,
    blocks,
  };
}

export default connect(mapStateToProps, {
  // creteNewRate,
  changeImg,
  getRateByID,
  getBlockById,
})(CreateRatePage);
