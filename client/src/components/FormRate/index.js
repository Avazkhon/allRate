import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import { useHistory } from "react-router-dom";

import {
  Button,
  TextField,
  // FormControl,
  // InputLabel,
  // Select,
  List,
  ListItem,
  Grid,
  // Icon,
} from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import SaveIcon from '@material-ui/icons/Save';

import {
  creteNewRate,
  // changeImg,
} from 'actions'


function randomNumber(min = 100000, max = 999999) {
  return Math.floor(Math.random() * (max - min) + min);
}

function FormRate (
  {
    creteNewRate,
    selectRate,
  },
) {
  let history = useHistory();

  const [rate, useChangeRate] = useState({
    title: '',
    description: '',
    dateStart: '',
    dateFinish: '',
  })

  const [party, useChangeParty] = useState(() => ([]))


  useEffect(() => {
    if (selectRate.data && selectRate.data._id) {
      useChangeRate({
        ...selectRate.data,
        dateStart: moment(selectRate.data.dateStart).format('YYYY-MM-DDTHH:mm'),
        dateFinish: moment(selectRate.data.dateFinish).format('YYYY-MM-DDTHH:mm'),
      })
      useChangeParty(selectRate.data.party)
    }
  }, [selectRate])




  function addParty() {
    useChangeParty([
      ...party,
      {
        id: randomNumber(),
        participator: '',
        description: '',
      }
    ])
  }

  function deleteParty (e) {
    const { id } = e.currentTarget.dataset;
    useChangeParty(party.filter(part => {
      return part.id !== Number(id)
    }))
  }

  function changeTextParty (e) {
    const { id } = e.currentTarget.dataset;
    const { name, value } = e.currentTarget;
    const newParty = party.map((part) => {
      if (part.id === Number(id)) {
        part[name] = value;
      }
      return part;
    })
    useChangeParty(newParty)
  }

  function changeRateText(e) {
    const { name, value } = e.currentTarget;
    useChangeRate({...rate, [name]: value})
  }

  function changeDateStart(e) {
    const dateStart = e.currentTarget.value;
    useChangeRate({...rate, dateStart})
  }

  function changeDateFinish(e) {
    const dateFinish = e.currentTarget.value;
    useChangeRate({...rate, dateFinish})
  }

  function handleCreteNewRate(){
    const data = {
      ...rate,
      dateStart: moment(rate.dateStart).utc().format(),
      dateFinish: moment(rate.dateFinish).utc().format(),
      party
    };

    creteNewRate(data)
      .then((action) => {
        history.push({search: `rateId=${action.response._id}`})
      })
  }

  return (
    <>
      <form>
        <Grid container>
          <Grid item xs={12}>
            <TextField
              name="title"
              label="Заголовок"
              value={rate.title}
              onChange={changeRateText}
              required
            />
            </Grid>
          <Grid item xs={12}>
            <TextField
              name="description"
              label="Описания"
              multiline
              value={rate.description}
              onChange={changeRateText}
              required
            />
            </Grid>
          <Grid item xs={6}>
            <TextField
              id="datetime-local"
              type="datetime-local"
              label="Время начало"
              value={rate.dateStart}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={changeDateStart}
            />
            </Grid>
          <Grid item xs={6}>
            <TextField
              id="datetime-local"
              type="datetime-local"
              label="Время завершения"
              value={rate.dateFinish}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={changeDateFinish}
            />
            </Grid>
        </Grid>
        <List component="nav" aria-label="contacts">
          {
            party.map((part) => {
              return (
                <ListItem button key={part.id}>
                  <Grid container>
                    <Grid item xs={12}>
                      <TextField
                        name="participator"
                        label="Названия команды"
                        value={part.participator}
                        inputProps={{
                          'data-id': part.id,
                        }}
                        onChange={changeTextParty}
                        required
                      />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          name="description"
                          label="Описания"
                          multiline
                          value={part.description}
                          inputProps={{
                            'data-id': part.id,
                          }}
                          onChange={changeTextParty}
                          required
                        />
                      </Grid>
                    <Grid item xs={12} sm={6}>
                      <Button
                        size="small"
                        variant="contained"
                        color="secondary"
                        onClick={deleteParty}
                        data-id={part.id}
                        // data-index={indexBlock}
                        // data-betindex={betindex}
                      >
                        <DeleteIcon />
                        Удалить участника
                      </Button>
                    </Grid>
                  </Grid>
                </ListItem>
              )
            })
          }
        </List>
        <Button
          variant="contained"
          color="primary"
          onClick={addParty}
        >
          <AddCircleIcon /> Добавить участника
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={handleCreteNewRate}
        >
          <SaveIcon /> Создать ставку
        </Button>
      </form>
    </>
  )
}

FormRate.propTypes = {
  creteNewRate: PropTypes.func,
  changeImg: PropTypes.func,
  selectRate: PropTypes.shape(),
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
  {
    creteNewRate,
  }
)(FormRate);
