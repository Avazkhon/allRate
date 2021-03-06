import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  List,
  ListItem,
  Typography,
  Button,
  Grid,
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';

import {
  rateStatusLive,
  typeBlock
} from '../../constants';


function CardBlock(
  {
    block,
    makeRate,
    statusLife,
  }
) {

  const [ isSelectWinTotal, setSelectWinTotal ] = useState(false)

  useEffect(() => {
    if(block.type === typeBlock.total) {
      block.bets.some((bet) => bet.win)
      if(block.bets.some((bet) => bet.win)) {
        setSelectWinTotal(true)
      }
    }
  })

  function makeBet (e) {
    const { betid, no_or_yes } = e.currentTarget.dataset
    const data = {
      participants: {}
    }
    if (no_or_yes !== undefined) {
      data.participants.noOrYes = (no_or_yes === 'true' && true) || (no_or_yes === 'false' && false)
    }

    const queryParams = {
      blocksId: null,
      blockId: block._id,
      betId: betid
    }

    makeRate(queryParams, data)
  }

  const disabledSelectWin = (
    (statusLife === rateStatusLive.finish)
    || (statusLife === rateStatusLive.archive)
    || block.type === typeBlock.total && !block.status
  )


  return (
    <>
      <Typography>
        {block.title.value}
      </Typography>
      <Typography>
        {block.description.value}
      </Typography>
      <List>
        {
          block.bets.map((bet) => {
              if(block.type === 'boolean') {
                const isSelectWin = typeof bet.noOrYes === 'boolean';
                return (
                  <ListItem button key={bet._id}>
                    <Grid container>
                      <Grid item xs={7} sm={10}>
                        <Typography>
                          {bet.condition}
                        </Typography>
                      </Grid>
                      <Grid item xs={5} sm={2}>
                        <Button
                          variant="contained"
                          color="primary"
                          data-betid={bet._id}
                          data-no_or_yes={false}
                          onClick={makeBet}
                          disabled={disabledSelectWin || !bet.status || isSelectWin}
                        >
                          {
                            bet.noOrYes === false &&
                            <CheckIcon />
                          }
                          Нет { bet.coefficientNo > 1 && bet.coefficientNo }
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          data-betid={bet._id}
                          data-no_or_yes={true}
                          onClick={makeBet}
                          disabled={disabledSelectWin || !bet.status || isSelectWin}
                        >
                        {
                          bet.noOrYes === true &&
                          <CheckIcon />
                        }
                          Да {bet.coefficientYes > 1 && bet.coefficientYes}
                        </Button>
                      </Grid>
                    </Grid>
                  </ListItem>
                )
              } else if (block.type === 'total') {
                  return (
                    <ListItem button key={bet._id}>
                      <Grid container>
                        <Grid item xs={7} sm={10}>
                          <Typography>
                            {bet.condition}
                          </Typography>
                        </Grid>
                        <Grid item xs={5} sm={2}>
                          <Button
                            variant="contained"
                            color="primary"
                            data-betid={bet._id}
                            onClick={makeBet}
                            disabled={disabledSelectWin || isSelectWinTotal}
                          >
                            {
                              bet.win &&
                              <CheckIcon />
                            }
                            Выбрать {bet.coefficient > 1 && bet.coefficient}
                          </Button>
                        </Grid>
                      </Grid>
                    </ListItem>
                  )
                }
              }
            )
          }
      </List>
    </>
  );
}

CardBlock.propTypes = {
  block: PropTypes.shape(),
  makeRate: PropTypes.func,
  statusLife: PropTypes.string,
}

export default CardBlock;
