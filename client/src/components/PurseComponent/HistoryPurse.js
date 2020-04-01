import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Table,
} from 'react-bootstrap';

import {
  basisForPayment,
} from '../../constants';
const {
  accountReplenishment,
  withdrawal,
  makeRate,
  win,
} = basisForPayment;

const keyBasisForPayment = {
  [accountReplenishment]: 'пополнения',
  [withdrawal]: 'вывод',
  [makeRate]: 'выигрыш',
  [win]: 'проигрыш',
};

function getMonth(index) {
  const month = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Ноябрь',
    'Декабрь',
  ];

  return month.find((month, i) => i === index);
}


class HistoryPurse extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      purse: {
        purse
      }
    } = this.props;
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Сумма</th>
            <th>Основание</th>
            <th>Время</th>
            <th>ID</th>
          </tr>
        </thead>
        <tbody>
          {
            purse && purse.history.map((invoice, index) => {
              const {
                _id,
                invoiceId,
                amount,
                time,
                basisForPayment
              } = invoice;
              const newDate = new Date(time);
              const date = `${newDate.getDate()} ${getMonth(newDate.getMonth())}`;
              return (
                <tr key={_id}>
                  <td>{index}</td>
                  <td>{amount}</td>
                  <td>{keyBasisForPayment[basisForPayment]}</td>
                  <td>{date}</td>
                  <td>{invoiceId}</td>
                </tr>
              );
            })
          }
        </tbody>
      </Table>
    )
  }
};

HistoryPurse.proptype = {
  purse: PropTypes.shape({})
}

export default HistoryPurse;
