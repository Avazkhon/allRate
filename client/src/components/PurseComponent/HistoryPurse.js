import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import classnames from 'classnames';

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
} = basisForPayment;

const keyBasisForPayment = {
  [accountReplenishment]: 'пополнения',
  [withdrawal]: 'вывод',
  [makeRate]: 'выигрыш',
  [win]: 'проигрыш',
};

class HistoryPurse extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sortBy: 'time',
    }
  }

  handleSort = (e) => {
    const { name } = e.currentTarget.dataset;
    console.log(name);
    this.setState({ sortBy: name })

  }

  render() {
    const {
      purse: {
        purse
      },
      classes,
    } = this.props;
    const {
      sortBy,
    } = this.state;

    const history = purse && purse.history.sort((a, b) => {
      if (a[sortBy] > b[sortBy]) {
        return -1;
      };
      if (a[sortBy] < b[sortBy]) {
        return 1;
      };
      return 0;
    });

    return (
      <>
        <h3>Истоия операции</h3>
        <table className={classes.table}>
          <tr>
          <th>#</th>
            <th data-name="amount" onClick={this.handleSort} >
              Сумма {sortBy === 'amount' ? <strong>*</strong> : ''}
            </th>
            <th data-name="basisForPayment" onClick={this.handleSort} >
              Основание {sortBy === 'basisForPayment' ? <strong>*</strong> : ''}
              </th>
            <th data-name="time" onClick={this.handleSort} >
              Время {sortBy === 'time' ? <strong>*</strong> : ''}
            </th>
          </tr>
          {
            history && history.map((invoice, index) => {
              const {
                _id,
                invoiceId,
                amount,
                time,
                basisForPayment
              } = invoice;
              const newDate = new Date(time);
              const date = `
                ${newDate.getDate()}
                ${getMonth(newDate.getMonth())}
                ${newDate.getHours()}:${newDate.getMinutes()}
                `;

              return (
                <tr key={_id}>
                  <td> {index} </td>
                 <td className={classnames('', {
                   [classes.plus]:
                     basisForPayment === accountReplenishment
                     || basisForPayment === makeRate,
                   [classes.minus]: basisForPayment === withdrawal
                     || basisForPayment === win,
                  })}
                  >
                    {amount}
                  </td>
                 <td>{keyBasisForPayment[basisForPayment]}</td>
                 <td>{date}</td>
               </tr>
              );
            })
          }
        </table>
      </>
    )
  }
};

HistoryPurse.proptype = {
  purse: PropTypes.shape({}),
  classes: PropTypes.shape({}),
}

export default injectSheet(historyStyle)(HistoryPurse)
