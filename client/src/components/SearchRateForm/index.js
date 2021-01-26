import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, useLocation } from "react-router-dom";
import queryString from 'query-string';

import {
  TextField,
  Button
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

function SearchRateForm() {
  const classes = useStyles();
  const history = useHistory()
  const location = useLocation()
  const [ text, setText ] = useState('')

  function handlesearchBets() {
    const prevSearch = queryString.parse(location.search)
    history.push({
      search: queryString.stringify({ ...prevSearch, text })
    })
  }

  function changeText(e) {
    const { value } = e.currentTarget;
    setText(value)
  }

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        id="outlined-basic"
        variant="outlined"
        label="Названия"
        onChange={changeText}
        value={text}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handlesearchBets}
      >
        Найти
      </Button>
    </form>
  );
}

SearchRateForm.propTypes = {

}

export default SearchRateForm
