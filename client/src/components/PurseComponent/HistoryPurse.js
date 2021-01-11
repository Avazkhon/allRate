import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';

import { DataGrid } from '@material-ui/data-grid';
import {
  getPurseHistory
} from 'actions';

import {
  basisForPayment,
  formatDateTime,
} from '../../constants';

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
  createDate: {
    RU: 'Дата',
    EN: 'Date'
  },
  warning: {
    RU: 'У Вас еще пока нет операции...',
    EN: 'You don’t have an operation yet ...'
  }
}

function HistoryPurse({
  lang,
  getPurseHistory,
}) {

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'basisForPayment', headerName: historyText.basisForPayment[lang], width: 120 },
    { field: 'amount', headerName: historyText.amount[lang], width: 120 },
    {
      field: 'createDate',
      headerName: historyText.createDate[lang],
      type: 'date',
      width: 180,
    },
  ];

  const [ history, changeHistpry ] = useState([])
  const [ isFetching, changeFetching ] = useState(false)

  useEffect(() => {
    changeFetching(true)
    getPurseHistory()
      .then((action) => {
        changeFetching(false)
        if (action.status === 'SUCCESS') {
          changeHistpry(action.response.history)
        }
      })
  }, [])

  const rows = history.map((invoice) => {
      const {
        _id,
        invoiceId,
        amount,
        createDate,
        basisForPayment
      } = invoice;

      return {
        id: _id,
        basisForPayment: keyBasisForPayment[basisForPayment][lang],
        amount,
        createDate: moment(createDate).format(formatDateTime)
      }
    })


  return (
    <>
      <h3>
        {historyText.title[lang]}
      </h3>
      <div style={{ height: '500px', width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={20}
          rowsPerPageOptions={[10, 20, 40, 80]}
          autoHeight
          loading={isFetching}
        />
      </div>
    </>
  )
}

HistoryPurse.propTypes = {
  purse: PropTypes.shape(),
  lang: PropTypes.strin,
}


export default connect(
  () => {},
  {
    getPurseHistory
  }
)(HistoryPurse);
