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
} from '@material-ui/core';

import CardBlock from 'components/CardBlock';

import {
  postMakeBet,
  getBlockById,
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
  }
) {
  const classes = useStyles();

  const [ isShowModalCreateInvice, changeShowModalCreateInvice] = useState(false);
  const [ participants, changeParticipants] = useState({});
  const [ queryParamsData, changeQueryParams] = useState({});
  const [ amount, changeAmount] = useState({});

  function makeRate(queryParams, data) {
    queryParams.blocksId = blocks.data._id;
    changeQueryParams(queryParams)
    changeParticipants(data)
    handleShowModalCreateInvice()
  }

  function handleShowModalCreateInvice () {
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
        blocks.data._id && blocks.data.blocks.map((block) => {
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
  postMakeBet: PropTypes.func,
  getBlockById: PropTypes.func,
  statusLife: PropTypes.string,
}

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
    postMakeBet,
    getBlockById,
  }
)(CardsBlocks);
