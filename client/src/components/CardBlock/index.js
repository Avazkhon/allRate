import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import {
  List,
  ListItem,
  Typography,
  Button,
  Grid,
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';

const useStyles = makeStyles({
  // root: {
  //   maxWidth: 345,
  // },
  // media: {
  //   height: 140,
  //   width: 200,
  // },
});

function CardBlock(
  {
    block,
    makeRate,
  }
) {
  const classes = useStyles();

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
                        >
                          <CheckIcon />Нет
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          data-betid={bet._id}
                          data-no_or_yes={true}
                          onClick={makeBet}
                        >
                          <CheckIcon />Да
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
                          >
                            <CheckIcon />Выбрать
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
}

export default CardBlock;
