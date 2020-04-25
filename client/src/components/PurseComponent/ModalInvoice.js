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

import PurseWidget from 'widgets/PurseWidget';

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
      }
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
      handleClose,
      auth,
      basisForPayment,
      getPurse,
      requisiteName
    } = this.props;

    if (auth.userData) {
      const { data } = this.state;
      const name = requisiteName === 'src' ? 'target' : 'src';
      data.requisites[name] = auth.userData.purseId;
      data.basisForPayment = basisForPayment;
      data.createTime = new Date();
      postInvoice(data).then((action) => {
        if (action.status === 'SUCCESS') {
          getPurse()
          handleClose();
        }
      });
    }
  }

  render() {
    const {
      show,
      handleClose,
      title,
      requisiteName,
    } = this.props;
    const {
      amount,
      data,
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
          placeholder="Ввидите сумму"
          name="amount"
          value={amount}
          onChange={this.handleChangeAmount}
        />
        <br />
        <Form.Control
          type="text"
          placeholder="Ввидите номер карты"
          name={requisiteName}
          value={data.requisites[requisiteName]}
          onChange={this.handleChangeSRC}
        />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={this.handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
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
};

function mapStateToProps(state) {
  const {
    auth,
  } = state;
  return {
    auth,
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
