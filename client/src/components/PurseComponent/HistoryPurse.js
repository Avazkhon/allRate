import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import classnames from 'classnames';

import {
  Spinner,
} from 'react-bootstrap';

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
  [makeRate]: 'ставка',
  [win]: 'выигрыш',
};

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
        purse
      },
      classes,
    } = this.props;
    const {
      sortBy,
    } = this.state;

    const history = this.sortHistory(purse);

    return (
      <>
        <h3>История операции</h3>
        <table className={classes.table}>
          <tr>
          <th>#</th>
            <th data-name="amount" onClick={this.handleSort} >
              Сумма {sortBy === 'amount' ? <strong>*</strong> : ''}
            </th>
            <th data-name="basisForPayment" onClick={this.handleSort} >
              Основание {sortBy === 'basisForPayment' ? <strong>*</strong> : ''}
              </th>
            <th data-name="createTime" onClick={this.handleSort} >
              Время {sortBy === 'createTime' ? <strong>*</strong> : ''}
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
                  <td className={classnames('', {
                  [classes.plus]:
                    basisForPayment === accountReplenishment
                    || basisForPayment === win,
                  [classes.minus]: basisForPayment === makeRate
                    || basisForPayment === withdrawal,
                  })}
                  >
                    {amount}
                  </td>
                  <td>{keyBasisForPayment[basisForPayment]}</td>
                  <td>{date}</td>
                </tr>
              )
            })
          }
        </table>
        { !purse &&
          <div className={classes.spinner}>
            <Spinner animation="border" variant="primary" />
          </div>
        }
      </>
    )
  }
};

HistoryPurse.proptype = {
  purse: PropTypes.shape({}),
  classes: PropTypes.shape({}),
}

export default injectSheet(historyStyle)(HistoryPurse)
