import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, useLocation } from "react-router-dom";
import queryString from 'query-string';

import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Grid,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

import {
  getUserByProps
} from 'actions'
import {
  rateStatusLive
} from '../../constants';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '40px 0 0 0',
  },
  formControl: {
    margin: theme.spacing(1),
    width: 80,
    marginTop: '-10px'
  },
}));

function SearchRateForm({
  getUserByProps
}) {
  const classes = useStyles();
  const history = useHistory()
  const location = useLocation()
  const [ text, setText ] = useState('')
  const [ statusLife, setStatusLife ] = useState('')
  const [ authorId, setAuthorId ] = useState('')
  const [ options, setOptions ] = useState([])
  const [ author, setAuthor ] = useState('')

  function handlesearchBets() {
    const prevSearch = queryString.parse(location.search)
    history.push({
      search: queryString.stringify({ ...prevSearch, text, statusLife, authorId })
    })
  }

  function changeText(e) {
    const { value, name } = e.currentTarget;
    if(name === 'text') {
      setText(value)
    }
    if(name === 'author') {
      setAuthor(value)
      getUserByProps({ userName: value })
        .then((action) => {
          if(action.status === 'SUCCESS') {
            setOptions(action.response)
          }
        })
    }
  }

  function selectUser(e) {
    setAuthorId(options[e.target.value]._id)
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
    <form className={classes.root}>
      <Grid container>
        <TextField
          id="outlined-basic"
          variant="outlined"
          label="Поиск"
          name="text"
          onChange={changeText}
          value={text}
          size="small"
        />

        <Autocomplete
           id="combo-box-demo"
           options={options}
           getOptionLabel={(option) => option.userName}
           style={{ width: 200 }}
           onChange={selectUser}
           renderInput={(params) => <TextField {...params} size="small" label="Имя" variant="outlined" name="author"  onChange={changeText} />}
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
            <MenuItem value={rateStatusLive.new}>Новые</MenuItem>
            <MenuItem value={rateStatusLive.active}>Активные</MenuItem>
            <MenuItem value={rateStatusLive.finish}>Завершившиеся</MenuItem>
            <MenuItem value={rateStatusLive.archive}>Архив</MenuItem>
          </Select>
        </FormControl>
      </Grid>
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
  getUserByProps: PropTypes.func
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
    getUserByProps
  },
)(SearchRateForm)
