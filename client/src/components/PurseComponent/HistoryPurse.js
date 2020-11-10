import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

import Messages from 'components/Messages';

import {
  basisForPayment,
} from '../../constants';

import {
  getMonth,
} from '../../utils';

import historyStyle from './historyStyle';

const {
  accountReplenishment,
  withdrawal,
  makeRate,
  win,
  percentage,
  stalemateSituation,
  returnMoney,
  leftovers,
} = basisForPayment;

const keyBasisForPayment = {
  [accountReplenishment]: { RU: 'пополнения', EN: 'account replenishment'},
  [withdrawal]: { RU: 'вывод', EN: 'withdrawal' },
  [makeRate]: { RU: 'ставка', EN: 'make bet'},
  [win]: { RU: 'выигрыш', EN: 'win'},
  [percentage]: { RU: 'заработок', EN: 'percentage'},
  [stalemateSituation]: { RU: 'патовая ситуация', EN: 'stalemate situation' },
  [returnMoney]: { RU: 'возврат средств', EN: 'refunds' },
  [leftovers]: { RU: 'Зачисления остатков кошелька', EN: 'leftovers' },
};

const historyText = {
  title: {
    RU:'История операции',
    EN:'Operation History'
  },
  amount: {
    RU: 'Сумма',
    EN: 'Amount'
  },
  basisForPayment: {
    RU: 'Основание',
    EN: 'Basis For Payment'
  },
  createTime: {
    RU: 'Дата',
    EN: 'Date'
  },
  warning: {
    RU: 'У Вас еще пока нет операции...',
    EN: 'You don’t have an operation yet ...'
  }
}

class HistoryPurse extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sortBy: 'createTime',
    }
  }

  handleSort = (e) => {
    const { name } = e.currentTarget.dataset;
    this.setState({ sortBy: name })

  }

  sortHistory = (purse) => {
    const { sortBy } = this.state;
    if (purse && purse.history) {
      return purse.history.sort((a, b) => {
        if (a[sortBy] > b[sortBy]) {
          return -1;
        };
        if (a[sortBy] < b[sortBy]) {
          return 1;
        };
        return 0;
      });
    }
    return [];
  }

  render() {
    const {
      purse: {
        isFetching,
        purse,
        error,
      },
      classes,
      lang,
    } = this.props;
    const {
      sortBy,
    } = this.state;

    const history = this.sortHistory(purse);

    return (
      <>
        <h3>{historyText.title[lang]}</h3>
        <table className={classes.table}>
          <tr>
          <th>#</th>
            <th data-name="amount" onClick={this.handleSort} >
              {historyText.amount[lang]} {sortBy === 'amount' ? <strong>*</strong> : ''}
            </th>
            <th data-name="basisForPayment" onClick={this.handleSort} >
              {historyText.basisForPayment[lang]} {sortBy === 'basisForPayment' ? <strong>*</strong> : ''}
              </th>
            <th data-name="createTime" onClick={this.handleSort} >
              {historyText.createTime[lang]} {sortBy === 'createTime' ? <strong>*</strong> : ''}
            </th>
          </tr>
          {
            history.map((invoice, index) => {
              const {
                _id,
                invoiceId,
                amount,
                createTime,
                basisForPayment
              } = invoice;
              const newDate = new Date(createTime);
              const date = `
                ${newDate.getDate()}
                ${getMonth(newDate.getMonth())}
                ${newDate.getHours()}:${newDate.getMinutes()}
                `;
              return (
                <tr key={_id}>
                  <td> {index} </td>
                  <td className={classes[invoice.action]}
                  >
                    {amount}
                  </td>
                  <td>{keyBasisForPayment[basisForPayment][lang]}</td>
                  <td>{date}</td>
                </tr>
              )
            })
          }
        </table>
        <Messages
          warning={!history.length && purse && !error && historyText.warning[lang]}
          error={error}
          isFetching={isFetching}
        />
      </>
    )
  }
};

HistoryPurse.propTypes = {
  purse: PropTypes.shape({}),
  classes: PropTypes.shape({}),
  lang: PropTypes.strin,
}

export default injectSheet(historyStyle)(HistoryPurse)
