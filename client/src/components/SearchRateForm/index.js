import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, useLocation } from "react-router-dom";
import queryString from 'query-string';

import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  BootstrapInput,
  MenuItem,
  Select
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  formControl: {
    margin: theme.spacing(1),
    width: 80,
  },
}));

function SearchRateForm() {
  const classes = useStyles();
  const history = useHistory()
  const location = useLocation()
  const [ text, setText ] = useState('')
  const [ statusLife, setStatusLife ] = useState('')

  function handlesearchBets() {
    const prevSearch = queryString.parse(location.search)
    history.push({
      search: queryString.stringify({ ...prevSearch, text, statusLife })
    })
  }

  function changeText(e) {
    const { value, name } = e.currentTarget;
    if(name === 'text') {
      setText(value)
    }
  }

  function changeStatusLife(e) {
    const { value } = e.target;
    setStatusLife(value)
  }

  function handleClear() {
    setText('')
    setStatusLife('')
    history.push({
      search: queryString.stringify({})
    })
  }

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        id="outlined-basic"
        variant="outlined"
        label="Поиск"
        name="text"
        onChange={changeText}
        value={text}
      />
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-customized-select-label">Статус</InputLabel>
        <Select
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          value={statusLife}
          onChange={changeStatusLife}
        >
          <MenuItem value="">
             <em>Все</em>
           </MenuItem>
          <MenuItem value="new">new</MenuItem>
          <MenuItem value="active">active</MenuItem>
          <MenuItem value="finish">finish</MenuItem>
        </Select>
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        onClick={handlesearchBets}
      >
        Найти
      </Button>

      <Button
        variant="contained"
        color="default"
        onClick={handleClear}
      >
        очистить
      </Button>
    </form>
  );
}

SearchRateForm.propTypes = {

}

export default SearchRateForm
