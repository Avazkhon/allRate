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
import HistoryPurse from './HistoryPurse';

import {
  basisForPayment,
} from '../../constants';

class PurseComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowModalReplenishAccount: false,
      isShowModalWithdrawal: false,
    }
  }

  handleShowModalRA = () => {
    this.setState((prevState) => ({ // Replenish Account
      isShowModalReplenishAccount: !prevState.isShowModalReplenishAccount
    }))
  }

  handleShowModalWithdrawal = () => {
    this.setState((prevState) => ({
      isShowModalWithdrawal: !prevState.isShowModalWithdrawal
    }))
  }

  render() {
    const {
      auth: {
        auth,
      },
      purse,
    } = this.props;

    const {
      isShowModalReplenishAccount,
      isShowModalWithdrawal,
    } = this.state
    return (
      <Container>
        <Row>
          <Col xs="6" sm="3" md="3">
            <ButtonGroup vertical>
              <Button onClick={this.handleShowModalRA}>
                Пополнить счет
              </Button>
              <Button onClick={this.handleShowModalWithdrawal}>
                Вывести деньги
              </Button>
            </ButtonGroup>
          </Col>
          <Col xs="6" sm="9" md="9">
            <PurseWidget
              idPurse
            />
          </Col>
        </Row>
        <Row>
          <HistoryPurse
            purse={purse}
          />
        </Row>
        <ModalInvoice
          title="Пополнения счета!"
          requisiteName="src"
          show={isShowModalReplenishAccount}
          handleClose={this.handleShowModalRA}
          basisForPayment={basisForPayment.accountReplenishment}
        />
        <ModalInvoice
          title="Снятия средств!"
          show={isShowModalWithdrawal}
          requisiteName="target"
          handleClose={this.handleShowModalWithdrawal}
          basisForPayment={basisForPayment.withdrawal}
        />
      </Container>
    );
  }
}

PurseComponent.propType = {
  auth: PropTypes.shape({}),
  purse: PropTypes.shape({}),
};

function mapStateToProps(state) {
  const {
    auth,
    purse,
  } = state;
  return {
    auth,
    purse
  };
}

export default connect(mapStateToProps, {
})(PurseComponent);
