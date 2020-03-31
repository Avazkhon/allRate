import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  Container,
  Row,
  Col,
  ButtonGroup,
  Button,
} from 'react-bootstrap';

import PurseWidget from 'widgets/PurseWidget';
import ModalInvoice from './ModalInvoice';

class PurseComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowModalReplenishAccount: false,
    }
  }

  handleShowModal = (e) => {
    this.setState((prevState) => ({
      isShowModalReplenishAccount: !prevState.isShowModalReplenishAccount
    }))
  }

  render() {
    const {
      auth: {
        auth,
      },
    } = this.props;

    const {
      isShowModalReplenishAccount,
    } = this.state
    return (
      <Container>
        <Row>
          <Col xs="6" sm="3" md="3">
            <ButtonGroup vertical>
              <Button
                onClick={this.handleShowModal}
              >
                Пополнить счет
              </Button>
              <Button>Вывести деньги</Button>
            </ButtonGroup>
          </Col>
          <Col xs="6" sm="9" md="9">
            <PurseWidget
              idPurse
            />
          </Col>
        </Row>
        <ModalInvoice
          show={isShowModalReplenishAccount}
          handleClose={this.handleShowModal}
        />
      </Container>
    );
  }
}

PurseComponent.propType = {
  auth: PropTypes.shape({}),
};

function mapStateToProps(state) {
  const {
    auth,
  } = state;
  return {
    auth,
  };
}

export default connect(mapStateToProps, {
})(PurseComponent);
