import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  Container,
  Row,
  Col,
  Button,
  Table,
} from 'react-bootstrap';

import {
  getWithdrawalRequest
} from 'actions'

import Layout from '../Layout';

class Purse extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    this.props.getWithdrawalRequest({page: 1, limit: 24})
  }

  render() {
    const {
      auth: {
        auth,
      },
      withdrawalRequest: {
        data: {
          docs,
        }
      },
    } = this.props;

    return (
      <Layout>
        <Container>
          <Row>
            <Col xs="12" sm="8" md="9">
            <h1>Страница вывода средств</h1>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>ID Пользователя</th>
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
                        <td>{WR.userId}</td>
                        <td>{WR.amount}</td>
                        <td>{WR.amount_due}</td>
                        <td>{WR.status}</td>
                        <td><Button variant="primary">Просмотр</Button></td>
                      </tr>
                      )
                  })
                }
              </tbody>
            </Table>
            </Col>
          </Row>
        </Container>
      </Layout>
    );
  }
}

Purse.propTypes = {
  auth: PropTypes.shape(),
  withdrawalRequest: PropTypes.shape(),
  getWithdrawalRequest: PropTypes.func,
};

function mapStateToProps(state) {
  const {
    auth,
    withdrawalRequest,
  } = state;
  return {
    auth,
    withdrawalRequest,
  };
}

export default connect(mapStateToProps, {
  getWithdrawalRequest
})(Purse);
