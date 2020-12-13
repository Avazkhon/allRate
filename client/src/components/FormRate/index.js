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
  const [data, useChangeData] = useState({
    title: '',
    description: '',
    dateStart: moment().utc().format(),
    dateFinish: moment().utc().format(),
  })

  const [party, useChangeParty] = useState([
    {
      id: 1,
      participator: '',
      description: '',
    },
    {
      id: 2,
      participator: '',
      description: '',
    },
  ])

  function addParty() {
    useChangeParty([
      ...party,
      {
        id: party.length + 1,
        participator: '',
        description: '',
      }
    ])
  }

  function deleteParty (e) {
    const { index } = e.currentTarget.dataset;
    const newParty = [...party];
    newParty.splice(index, 1)
    useChangeParty(newParty)
  }

  return (
    <>
      <form>
        <Grid container>
          <Grid item xs={12}>
            <TextField
              name="title"
              label="Заголовок"
              // id="standard-password-input"
              // defaultValue={bet.condition}
              // inputProps={{
              //   'data-index': indexBlock,
              //   'data-betindex': betindex,
              // }}
              // onChange={handleChangeTextBets}
              required
            />
            </Grid>
          <Grid item xs={12}>
            <TextField
              name="description"
              label="Описания"
              multiline
              // id="standard-password-input"
              // defaultValue={bet.condition}
              // inputProps={{
              //   'data-index': indexBlock,
              //   'data-betindex': betindex,
              // }}
              // onChange={handleChangeTextBets}
              required
            />
            </Grid>
          <Grid item xs={6}>
            <TextField
              id="datetime-local"
              label="Время начало"
              type="datetime-local"
              InputLabelProps={{
                shrink: true,
              }}
            />
            </Grid>
          <Grid item xs={6}>
            <TextField
              id="datetime-local"
              label="Время завершения"
              type="datetime-local"
              InputLabelProps={{
                shrink: true,
              }}
            />
            </Grid>
        </Grid>
        <List component="nav" aria-label="contacts">
          {
            party.map((part, partindex) => {
              return (
                <ListItem button key={part.id}>
                  <Grid container>
                    <Grid item xs={12}>
                      <TextField
                        name="participator"
                        label="Названия команды"
                        // id="standard-password-input"
                        // defaultValue={bet.condition}
                        // inputProps={{
                        //   'data-index': indexBlock,
                        //   'data-betindex': betindex,
                        // }}
                        // onChange={handleChangeTextBets}
                        required
                      />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          name="description"
                          label="Описания"
                          multiline
                          // id="standard-password-input"
                          // defaultValue={bet.condition}
                          // inputProps={{
                          //   'data-index': indexBlock,
                          //   'data-betindex': betindex,
                          // }}
                          // onChange={handleChangeTextBets}
                          required
                        />
                      </Grid>
                    <Grid item xs={12} sm={6}>
                      <Button
                        size="small"
                        variant="contained"
                        color="secondary"
                        onClick={deleteParty}
                        data-index={partindex}
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
