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
    block
  }
) {
  const classes = useStyles();
console.log(block);

  return (
    <>
      <Typography>
        {block.title.value}
      </Typography>
      <Typography>
        {block.description.value}
      </Typography>
      <List>
        {block.bets.map((bet) => {
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
                  >
                    <CheckIcon />Выбрать
                  </Button>
                </Grid>
              </Grid>
            </ListItem>
          )
        })}
      </List>
    </>
  );
}

CardBlock.propTypes = {
  block: PropTypes.shape(),
}

export default CardBlock;
