import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { makeStyles } from '@material-ui/core/styles';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
} from '@material-ui/core';

import {
  Grid
} from '@material-ui/core';

import {
  getSupportByID,
} from 'actions';

import CardSupport from 'components/CardSupport';

import Layout from '../Layout';


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function WorkWithSupport({
  getSupportByID,
  history,
}) {
  const classes = useStyles()
  const [ support, setSupport ] = useState({})
  const [ comment, setComment ] = useState('')


  useEffect(() => {
    const { supportId } = queryString.parse(history.location.search)
    getSupportByID(supportId)
      .then((action) => {
        if(action.status === 'SUCCESS') {
          setSupport(action.response)
        }
      })
  }, [])

  function handleChangeStatus(e) {
    const { value } = e.target;
    setSupport({ ...support, status: value })
  }

  function changeComment(e) {
    const { value } = e.target;
    setComment(value)
  }

  return (
    <Layout>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Grid item >
          <h1>Обращение</h1>
            <CardSupport
              support={support}
            />
          </Grid>
          <Grid item >
            <FormControl className={classes.formControl}>
             <InputLabel id="demo-simple-select-label">Статус</InputLabel>
             <Select
               labelId="demo-simple-select-label"
               id="demo-simple-select"
               value={support.status || ''}
               onChange={handleChangeStatus}
             >

               <MenuItem value={'new'}>Новый</MenuItem>
               <MenuItem value={'skip'}>Пропустить</MenuItem>
               <MenuItem value={'in_progress'}>В работе</MenuItem>
               <MenuItem value={'resolved'}>Решен</MenuItem>
               <MenuItem value={'reject'}>Не решен</MenuItem>
             </Select>
           </FormControl>
         </Grid>
         <Grid item >
           <TextField
              id="outlined-multiline-static"
              label="Multiline"
              multiline
              onChange={changeComment}
              value={comment}
              variant="outlined"
            />
          </Grid>
          <Grid item >
            <Button variant="contained" color="primary">
              Сохранить комментарии
            </Button>
        </Grid>
      </Grid>
    </Layout>
  )
}

WorkWithSupport.propTypes = {
  support: PropTypes.shape(),
  history: PropTypes.shape(),
  getSupportByID: PropTypes.func
}


function mapStateToProps() {
  return ({

  })
}

export default connect(
  mapStateToProps,
  {
    getSupportByID
  }
)(WorkWithSupport)