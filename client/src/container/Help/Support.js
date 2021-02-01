import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


import {
  TextField,
  Button,
  Grid,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

import {
  validateEmail,
} from 'utils';

import {
  createSuppot
} from 'actions'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

function Support({
  auth,
  createSuppot,
}) {
  const classes = useStyles()
  const [ data, setData ] = useState({})
  const [ errors, setErrors ] = useState({})
  const [ request, setRequest ] = useState({})

  function handleChange(e) {
    const { value, name } = e.target;
    if(name === 'email') {
      setErrors({
        [name]: !validateEmail(value)
      })
    }
    if (name === 'subject') {
      setErrors({
        [name]: value.length < 5 || value.length > 50
      })
    }
    if (name === 'text') {
      setErrors({
        [name]: value.length < 20 || value.length > 100
      })
    }
    setData({ ...data, [name]: value })
  }

  function submit() {
    createSuppot(data)
      .then((action) => {
        if (action.status === 'SUCCESS') {
          setData({})
          setRequest({ severity: 'success', message: 'Ваша письмо принято'})
        } else {
          setRequest({ severity: 'error', message: action.response.error })
        }
      })
  }

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <TextField
          id="standard-basic"
          label="Тема"
          value={data.subject}
          onChange={handleChange}
          name="subject"
          error={errors.subject}
        />
        <TextField
          id="outlined-multiline-static"
          label="Текст"
          multiline
          value={data.text}
          variant="outlined"
          onChange={handleChange}
          name="text"
          error={errors.text}
        />
        {
          !auth.auth &&
          <TextField
            error={errors.email}
            id="standard-basic"
            label="Почта"
            value={data.email}
            onChange={handleChange}
            name="email"
          />
        }
        { request.message &&
          <Alert severity= {request.severity}>{request.message}</Alert>
        }
        <Button variant="contained" color="primary" onClick={submit}>
          отпрвить
        </Button>
      </Grid>
    </form>
  );
}

Support.propTypes = {
  auth: PropTypes.shape(),
  createSuppot: PropTypes.func,
}

function mapStateToProps(state) {
  // const {
  //   auth,
  // } = state;
  return {
  };
}

export default connect(
  mapStateToProps,
  {
    createSuppot
  }
)(Support);
