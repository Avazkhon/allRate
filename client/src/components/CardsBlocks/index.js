import React, { useState} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import {
  Collapse,
  CardContent,
  Drawer,
  TextField,
  Button,
  Grid,
  Typography,
} from '@material-ui/core';

import CardBlock from 'components/CardBlock';

import {
  postMakeBet,
  getBlockById,
  getPurse
} from 'actions';

const useStyles = makeStyles((theme) => ({
  modalCreateInvice: {
    padding: '20px',
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  margin: {
    margin: theme.spacing(2),
  },
}));

function CardsBlocks(
  {
    blocks,
    postMakeBet,
    getBlockById,
    statusLife,
    getPurse
  }
) {
  const classes = useStyles();

  const [ isShowModalCreateInvice, changeShowModalCreateInvice] = useState(false);
  const [ participants, changeParticipants] = useState({});
  const [ queryParamsData, changeQueryParams] = useState({});
  const [ amount, changeAmount] = useState({});
  const [ purseData, changePurse] = useState({});
  const [ modalData, changeModalData] = useState({});

  function makeRate(queryParams, data) {
    queryParams.blocksId = blocks.data._id;
    const tmp = blocks.data.blocks.find( blocks => blocks._id === queryParams.blockId)
      .bets.find( bet => bet._id === queryParams.betId);
    changeModalData(
      {
        coefficient: (tmp.coefficient || tmp.coefficientNo || tmp.coefficientYes),
        condition: tmp.condition,
        noOrYes: data.participants.hasOwnProperty('noOrYes') ? (data.participants.noOrYes ? 'Да': 'Нет') : ''
      }
    )
    changeQueryParams(queryParams)
    changeParticipants(data)
    handleShowModalCreateInvice()
  }

  function handleShowModalCreateInvice () {
    getPurse().then((action) => {
      if(action.status === 'SUCCESS') {
        changePurse(action.response)
      }
    })
    changeShowModalCreateInvice(!isShowModalCreateInvice)
  }

  function handleChangeAmount (e) {
    changeAmount(e.target.value)
  }

  function handleSibmit() {
    participants.participants.amount = Number(amount);
    postMakeBet(queryParamsData, participants)
      .then((action) => {
        if(action.status === 'SUCCESS') {
          getBlockById(blocks.data._id)
          handleShowModalCreateInvice()
        }
      })
  }

  return (
    < >
      {
        blocks.data && blocks.data._id && blocks.data.blocks.map((block) => {
          return (
            <Collapse in={true} key={block._id}>
              <CardContent>
                <CardBlock
                  block={block}
                  makeRate={makeRate}
                  statusLife={statusLife}
                  key={block._id}
                />
              </CardContent>
            </Collapse>
          )
        })
      }
      <Drawer anchor="top" open={isShowModalCreateInvice} onClose={handleShowModalCreateInvice}>
        <form className={classes.modalCreateInvice} noValidate autoComplete="off">
          <Grid container>
            <Grid item xs={12}>
              <Typography>
                { !!purseData.amount && 'Текущий счет:' } { purseData.amount } { purseData.currency }
              </Typography>
              <Typography>
                {
                  (modalData.coefficient < 1 || !modalData.coefficient ) ?
                  'Коэф. еще не определен' :
                  'Текущий коэф: ' + modalData.coefficient
                }
              </Typography>
              <Typography>
                { modalData.condition && 'Пари:' } { modalData.condition }
                { modalData.noOrYes && ' - ' }{ modalData.noOrYes }
              </Typography>
              <TextField
                id="standard-basic"
                label="Введите сумму"
                className={classes.margin}
                onChange={handleChangeAmount}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                size="medium"
                color="primary"
                className={classes.margin}
                onClick={handleSibmit}
              >
                Сделать ставку
              </Button>
            </Grid>
          </Grid>
        </form>
      </Drawer>
    </>
  );
}

CardsBlocks.propTypes = {
  blocks: PropTypes.shape(),
  purse: PropTypes.shape(),
  postMakeBet: PropTypes.func,
  getBlockById: PropTypes.func,
  getPurse: PropTypes.func,
  statusLife: PropTypes.string,
}

function mapStateToProps(state) {
  const {
    auth,
    purse
  } = state;
  return {
    auth,
    purse
  };
}

export default connect(
  mapStateToProps,
  {
    postMakeBet,
    getBlockById,
    getPurse
  }
)(CardsBlocks);
