import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


import {
  TextField,
  Button,
  Grid
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

function Support({ auth }) {
  const classes = useStyles()
  console.log(auth);
  return (
    <form className={classes.root} noValidate autoComplete="off">
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <TextField id="standard-basic" label="Тема" />
        <TextField
          id="outlined-multiline-static"
          label="Текст"
          multiline
          value=""
          variant="outlined"
        />
        <TextField id="standard-basic" label="Почта" />
        <Button variant="contained" color="primary">
          отпрвить
        </Button>
      </Grid>
    </form>
  );
}

Support.propTypes = {
  auth: PropTypes.shape(),
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
  {}
)(Support);
