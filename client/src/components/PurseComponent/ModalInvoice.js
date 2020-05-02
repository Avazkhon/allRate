import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  Button,
  Modal,
  Form,
} from 'react-bootstrap';

import {
  postInvoice,
  getPurse,
} from 'actions';

import Messages from 'components/Messages';
import PurseWidget from 'widgets/PurseWidget';

const placeholder = {
  card: {
    RU: 'Введите номер карты',
    EN: 'Enter card number',
  },
  amount: {
    RU: 'Введите сумму',
    EN: 'Enter amount'
  },
};

const actionText = {
  cancel: {
    RU: 'Назад',
    EN: 'Сancel',
  },
  save: {
    RU: 'Сохранить',
    EN: 'Save'
  },
};

class ModalInvoice extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {
        amount: null,
        requisites: {
          src: '',
          target: ''
        },
      },
      warning: '',
      error: '',
      isFetching: false,
    }
  }

  handleChangeSRC = (e) => {
    const { value, name } = e.currentTarget;
    this.setState((prevState) => ({
      data: {
        ...prevState.data,
        requisites: {
          ...prevState.data.requisites,
          [name]: value
        }
      }
    }))
  }

  handleChangeAmount = (e) => {
    const { value } = e.currentTarget;
    this.setState((prevState) => ({
      data: {
        ...prevState.data,
        amount: value,
      }
    }))
  }

  handleSubmit = () => {
    const {
      postInvoice,
      auth,
      basisForPayment,
      getPurse,
      requisiteName
    } = this.props;

    this.setState({isFetching: true});

    if (auth.userData) {
      const { data } = this.state;
      const name = requisiteName === 'src' ? 'target' : 'src';
      data.requisites[name] = auth.userData.purseId;
      data.basisForPayment = basisForPayment;
      data.createTime = new Date();
      postInvoice(data).then((action) => {
        if (action.status === 'SUCCESS') {
          this.setState({
            isFetching: false,
            warning: 'Счет успешно обновлен!'
          });
          getPurse();
        };
        this.setState({
          isFetching: false,
          error: action.error
        });
      });
    }
  }

  handleClose = () => {
    this.setState({ warning: '' });
    const { handleClose } = this.props;
    handleClose();
  }

  render() {
    const {
      show,
      handleClose,
      title,
      requisiteName,
      lang: {
        lang,
      },
    } = this.props;
    const {
      amount,
      data,
      warning,
      error,
      isFetching,
    } = this.state;
    return (
      <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{ title }</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder={placeholder.amount[lang]}
          name="amount"
          value={amount}
          onChange={this.handleChangeAmount}
        />
        <br />
        <Form.Control
          type="text"
          placeholder={placeholder.card[lang]}
          name={requisiteName}
          value={data.requisites[requisiteName]}
          onChange={this.handleChangeSRC}
        />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={this.handleClose}>
          {actionText.cancel[lang]}
        </Button>
        <Button variant="primary" onClick={this.handleSubmit}>
          {actionText.save[lang]}
        </Button>
      </Modal.Footer>
      {
        show &&
        <Messages
          warning={warning}
          error={error}
          isFetching={isFetching}
        />
      }
    </Modal>
    );
  }
}

ModalInvoice.propType = {
  show: PropTypes.bool.isRequired,
  basisForPayment: PropTypes.string.isRequired,
  requisiteName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  auth: PropTypes.shape({}),
  lang: PropTypes.shape({}),
};

function mapStateToProps(state) {
  const {
    auth,
    lang,
  } = state;
  return {
    auth,
    lang,
  };
}

export default connect(
  mapStateToProps,
  {
    postInvoice,
    getPurse,
  }
)
(ModalInvoice);
