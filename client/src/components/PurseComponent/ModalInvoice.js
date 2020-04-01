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
} from 'actions';

import PurseWidget from 'widgets/PurseWidget';

class ModalInvoice extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {
        amount: null,
        requisites: {
          src: "",
        },
      }
    }
  }

  handleChangeSRC = (e) => {
    const { value } = e.currentTarget;
    this.setState((prevState) => ({
      data: {
        ...prevState.data,
        requisites: {
          ...prevState.data.requisites,
          src: value
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
      basisForPayment
    } = this.props;

    if (auth.userData) {
      const { data } = this.state;
      data.requisites.target = auth.userData.purseId;
      data.basisForPayment = basisForPayment;
      postInvoice(data).then((action) => {
        console.log(action);
        if (action.status === 'SUCCESS') {
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
    } = this.props;
    const {
      amount,
      src,
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
          name="src"
          value={src}
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
  }
)
(ModalInvoice);
