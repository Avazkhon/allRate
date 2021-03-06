import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  Row,
  Col,
  Button,
  Table,
  Modal,
  ListGroup,
  Form,
} from 'react-bootstrap';

import {
  getWithdrawalRequestAdmin,
  patchWithdrawalRequestAdmin,
} from 'actions/admin'

import Layout from '../Layout';

class Purse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      description: '',
      isShowModal: null,
    }
  }

  componentDidMount() {
    this.props.getWithdrawalRequestAdmin({page: 1, limit: 24, status: 'inprogress'})
  }

  submitWR = (description, status, id) => {
    this.setState({ id })
    this.props.patchWithdrawalRequestAdmin(
      id,
      {
        description,
        status,
      },
    )
    .then((action) => {
      if (action.status === 'SUCCESS') {
        alert('Статус успешно изменен')
      } else {
        alert(`Статус не изменен: ${action.error.message}`)
      }
      this.setState({ id: null })
    })
  }


  handleMake = (e) => {
    const id = e.currentTarget.dataset.id;
    const { name } = e.currentTarget;
    const {
      description,
    } = this.state;
    this.submitWR(description, name, id);
  }

  handleChange = (e) => {
    const value = e.currentTarget.value;
    this.setState({description: value})
  }

  handleShow = (e) => {
    const id = e.currentTarget.dataset.id;
    this.setState({isShowModal: id})
  }

  handleClose = () => {this.setState({isShowModal: null})}

  render() {
    const {
      id,
      isShowModal,
      description,
    } = this.state;
    const {
      auth: {
        userData,
      },
      withdrawalRequestAdmin: {
        data: {
          docs,
        }
      },
    } = this.props;

    return (
      <Layout>
        <Row>
          <Col xs="12" sm="8" md="9">
            <h1>Страница вывода средств</h1>
            {
              userData && userData.isAdmin &&
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Номер карты</th>
                    <th>Сумма перевод</th>
                    <th>Сумма перевода с учетом коммисии</th>
                    <th>Статус</th>
                    <th>Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    docs.map((WR, i) => {
                      return (
                        <tr key={WR._id}>
                          <td>{i + 1}</td>
                          <td>{WR.target}</td>
                          <td>{WR.amount}</td>
                          <td>{WR.amount_due}</td>
                          <td>{WR._id === id ? 'Загрузка' : WR.status}</td>
                          <td>
                            <Button variant="primary" data-id={WR._id} onClick={this.handleShow}>Выполнить</Button>
                          </td>
                        </tr>
                        )
                    })
                  }
                </tbody>
              </Table>
            }
            <Modal show={!!isShowModal} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Выберите действия</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {
                  docs.map((WR) => {
                    if (WR._id !== isShowModal) {
                      return '';
                    }
                    return (
                      <ListGroup>
                        <ListGroup.Item>{WR.target}</ListGroup.Item>
                        <ListGroup.Item>{WR.amount}</ListGroup.Item>
                        <ListGroup.Item>{WR.amount_due}</ListGroup.Item>
                        <ListGroup.Item>{WR._id === id ? 'Загрузка' : WR.status}</ListGroup.Item>
                      </ListGroup>
                    )
                  })
                }
                <Form.Group>
                  <Form.Control size="lg" type="text" placeholder="Введите описания" value={description} onChange={this.handleChange}/>
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" data-id={isShowModal} name="successfully" onClick={this.handleMake}>Успешный перевод</Button>
                <Button variant="danger" data-id={isShowModal} name="refused" onClick={this.handleMake}>Не успешный перевод</Button>
              </Modal.Footer>
            </Modal>
          </Col>
        </Row>
      </Layout>
    );
  }
}

Purse.propTypes = {
  auth: PropTypes.shape(),
  userData: PropTypes.shape(),
  withdrawalRequestAdmin: PropTypes.shape(),
  getWithdrawalRequestAdmin: PropTypes.func,
  patchWithdrawalRequestAdmin: PropTypes.func,
};

function mapStateToProps(state) {
  const {
    auth,
    userData,
    withdrawalRequestAdmin,
  } = state;
  return {
    auth,
    userData,
    withdrawalRequestAdmin,
  };
}

export default connect(mapStateToProps, {
  getWithdrawalRequestAdmin,
  patchWithdrawalRequestAdmin,
})(Purse);
