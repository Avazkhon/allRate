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

const actionText = {
  increase: {
    RU: 'Пополнить счет',
    EN: 'Replenish account',
  },
  decrease: {
    RU: 'Вывести деньги',
    EN: 'Withdraw money',
  }
}

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
      lang: {
        lang,
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
                {actionText.increase[lang]}
              </Button>
              <Button onClick={this.handleShowModalWithdrawal}>
                {actionText.decrease[lang]}
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
            lang={lang}
            purse={purse}
          />
        </Row>
        <ModalInvoice
          title={actionText.increase[lang]}
          requisiteName="src"
          show={isShowModalReplenishAccount}
          handleClose={this.handleShowModalRA}
          basisForPayment={basisForPayment.accountReplenishment}
        />
        <ModalInvoice
          title={actionText.decrease[lang]}
          show={isShowModalWithdrawal}
          requisiteName="target"
          handleClose={this.handleShowModalWithdrawal}
          basisForPayment={basisForPayment.withdrawal}
        />
      </Container>
    );
  }
}

PurseComponent.propTypes = {
  auth: PropTypes.shape({}),
  purse: PropTypes.shape({}),
  lang: PropTypes.shape({}),
};

function mapStateToProps(state) {
  const {
    auth,
    purse,
    lang,
  } = state;
  return {
    auth,
    purse,
    lang,
  };
}

export default connect(mapStateToProps, {
})(PurseComponent);
