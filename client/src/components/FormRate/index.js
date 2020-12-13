import React, { useState } from 'react';
import moment from 'moment-timezone';

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

function FormRate () {
  const [rate, useChangeRate] = useState({
    title: '',
    description: '',
    dateStart: '',
    dateFinish: '',
  })

  const [party, useChangeParty] = useState([
    {
      _id: 1,
      participator: '',
      description: '',
    },
    {
      _id: 2,
      participator: '',
      description: '',
    },
  ])

  function addParty() {
    useChangeParty([
      ...party,
      {
        _id: Date.now(),
        participator: '',
        description: '',
      }
    ])
  }

  function deleteParty (e) {
    const { id } = e.currentTarget.dataset;
    useChangeParty(party.filter(part => part._id !== Number(id)))
  }

  function changeTextParty (e) {
    const { id } = e.currentTarget.dataset;
    const { name, value } = e.currentTarget;
    const newParty = party.map((part) => {
      if (part._id === Number(id)) {
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

  function changeDateStart(dateStart) {
    useChangeRate({...rate, dateStart})
  }

  function changeDateFinish(dateFinish) {
    useChangeRate({...rate, dateFinish})
  }

  return (
    <>
      <form>
        <Grid container>
          <Grid item xs={12}>
            <TextField
              name="title"
              label="Заголовок"
              defaultValue={rate.title}
              onChange={changeRateText}
              required
            />
            </Grid>
          <Grid item xs={12}>
            <TextField
              name="description"
              label="Описания"
              multiline
              defaultValue={rate.description}
              onChange={changeRateText}
              required
            />
            </Grid>
          <Grid item xs={6}>
            <TextField
              id="datetime-local"
              type="datetime-local"
              label="Время начало"
              defaultValue={rate.dateStart}
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
              defaultValue={rate.dateFinish}
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
                <ListItem button key={part._id}>
                  <Grid container>
                    <Grid item xs={12}>
                      <TextField
                        name="participator"
                        label="Названия команды"
                        defaultValue={part.participator}
                        inputProps={{
                          'data-id': part._id,
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
                          defaultValue={part.description}
                          inputProps={{
                            'data-id': part._id,
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
                        data-id={part._id}
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
      </form>
    </>
  )
}

export default FormRate;
