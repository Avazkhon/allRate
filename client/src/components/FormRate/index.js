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
  CardMedia
  // Icon,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import SaveIcon from '@material-ui/icons/Save';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

import AlertDialogSlide from 'widgets/AlertDialogSlide';

import UploadButtons from 'widgets/UploadButtons';

import {
  creteNewRate,
  putRateByID,
  putRateLiveByID,
  putPaymentRateByBlock,
  getRateByID,
  getBlockById,
  changeImg,
} from 'actions'

import {
  rateStatusLive,
} from '../../constants';


const useStyles = makeStyles((theme) => ({
  media: {
    margin: '5px',
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
}));

function randomNumber(min = 100000, max = 999999) {
  return Math.floor(Math.random() * (max - min) + min);
}

function FormRate (
  {
    creteNewRate,
    selectRate,
    putRateByID,
    putRateLiveByID,
    getRateByID,
    putPaymentRateByBlock,
    getBlockById,
    paymentPercentage,
    changeImg,
  }
) {
  const classes = useStyles();
  let history = useHistory();

  const [rate, setChangeRate] = useState({
    title: '',
    description: '',
    dateStart: '',
    dateFinish: '',
  })

  const [alertDate, setAlertDate] = useState({
    title: '',
    description: '',
    type: '',
  })

  const [party, setChangeParty] = useState(() => ([]))
  const [isFetching, setStatusFinish] = useState(() => (false))


  useEffect(() => {
    if (selectRate.data && selectRate.data._id) {
      setChangeRate({
        ...selectRate.data,
        dateStart: moment(selectRate.data.dateStart).format('YYYY-MM-DDTHH:mm'),
        dateFinish: moment(selectRate.data.dateFinish).format('YYYY-MM-DDTHH:mm'),
      })
      setChangeParty(selectRate.data.party)
    }
  }, [selectRate])




  function addParty() {
    setChangeParty([
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
    setChangeParty(party.filter(part => {
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
    setChangeParty(newParty)
  }

  function changeRateText(e) {
    const { name, value } = e.currentTarget;
    setChangeRate({...rate, [name]: value})
  }

  function changeDateStart(e) {
    const dateStart = e.currentTarget.value;
    setChangeRate({...rate, dateStart})
  }

  function changeDateFinish(e) {
    const dateFinish = e.currentTarget.value;
    setChangeRate({...rate, dateFinish})
  }

  function handleCreteNewRate(){
    const data = {
      ...rate,
      dateStart: moment(rate.dateStart).utc().format(),
      dateFinish: moment(rate.dateFinish).utc().format(),
      party
    };

    setStatusFinish(true)

    creteNewRate(data)
      .then((action) => {
        setStatusFinish(false)
        if (action.status === 'SUCCESS') {
          setChangeRate(
            {
              ...action.response,
              dateStart: moment(action.response.dateStart).format('YYYY-MM-DDTHH:mm'),
              dateFinish: moment(action.response.dateFinish).format('YYYY-MM-DDTHH:mm'),
            }
          )
          history.push({search: `rateId=${action.response._id}`})
        } else {
          setAlertDate({
            title: 'Ошибка',
            description: 'Ошибка при создании ставки',
            type: 'error',
            isOpen: true,
          })
        }
      })
  }

  function handleChangeRate () {
    const data = {
      ...rate,
      dateStart: moment(rate.dateStart).utc().format(),
      dateFinish: moment(rate.dateFinish).utc().format(),
      party
    };
    setStatusFinish(true)
    putRateByID(data)
      .then((action) => {
        setStatusFinish(false)
        if (action.status === 'SUCCESS') {
          setChangeRate(action.response)
        } else {
          setAlertDate({
            title: 'Ошибка',
            description: 'Ошибка при обновлений ставки',
            type: 'error',
            isOpen: true,
          })
        }
      })
  }

  function handleChangeRateLiveByID (e) {
    const { name } = e.currentTarget;
    setStatusFinish(true)
    putRateLiveByID(name, rate._id)
      .then((action) => {
        setStatusFinish(false)
        if (action.status === 'SUCCESS') {
          setChangeRate(action.response)
        } else {
          setAlertDate({
            title: 'Ошибка',
            description: 'Ошибка при обновлений ставки',
            type: 'error',
            isOpen: true,
          })
        }

      })
  }

  function handlePaymentRateByBlock () {
    putPaymentRateByBlock(rate.blockId)
      .then((action) => {
        if (action.status === 'SUCCESS') {
          getRateByID(rate._id)
          getBlockById(rate.blockId)
        } else {
          setAlertDate({
            title: 'Ошибка',
            description: 'Ошибка при выполнения оплаты',
            type: 'error',
            isOpen: true,
          })
        }
      })
  }

  function partUploadFile(e) {
    const image = e.target.files[0];
    const { id } = e.target.dataset;
    changeImg([image])
    .then((action) => {
      if(action.status === 'SUCCESS') {
        rate.party = rate.party.map((part) => {
          if (part.id == Number(id)) {
            part.img = action.response[0].imageName;
          }
          return part
        })
        console.log(rate);
        putRateByID(rate)
      }
    })
  }

  function uploadFile(e) {
    const image = e.target.files[0];
    changeImg([image])
    .then((action) => {
      if(action.status === 'SUCCESS') {
        putRateByID({_id: rate._id, img: action.response[0].imageName })
      }
    })
  }

  const isDisabledByLife = (rate.statusLife === rateStatusLive.finish) ||  (rate.statusLife === rateStatusLive.archive)


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
              disabled={isFetching || isDisabledByLife}
              required
            />
            </Grid>
          <Grid item xs={12}>
            <TextField
              name="description"
              label="Описания"
              value={rate.description}
              onChange={changeRateText}
              disabled={isFetching || isDisabledByLife}
              multiline
              required
            />
            </Grid>
          <Grid item xs={6}>
            <TextField
              id="datetime-local"
              type="datetime-local"
              label="Время начало"
              value={rate.dateStart}
              disabled={isFetching || isDisabledByLife}
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
              disabled={isFetching || isDisabledByLife}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={changeDateFinish}
            />
            </Grid>
            {
              rate.statusLife &&
              <Grid item xs={6}>
                {
                  rate.img &&
                  <CardMedia
                   className={classes.media}
                   image={'/media/image/' + rate.img }
                   title="Main rate img"
                 />
                }
                {
                  !isDisabledByLife &&
                  <UploadButtons
                    id={1}
                    uploadFile={uploadFile}
                  />
                }
              </Grid>
            }
        </Grid>
        <List component="nav" aria-label="contacts">
          {
            party.map((part) => {
              return (
                <ListItem button key={part.id}>
                  <Grid container>
                    <Grid xs={6}>
                      <CardMedia
                       className={classes.media}
                       image={'/media/image/' + part.img }
                       title="part img"
                     />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        name="participator"
                        label="Названия команды"
                        value={part.participator}
                        onChange={changeTextParty}
                        inputProps={{
                          'data-id': part.id,
                        }}
                        disabled={isFetching || isDisabledByLife}
                        required
                      />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          name="description"
                          label="Описания"
                          multiline
                          value={part.description}
                          onChange={changeTextParty}
                          inputProps={{
                            'data-id': part.id,
                          }}
                          disabled={isFetching || isDisabledByLife}
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
                        disabled={isFetching || isDisabledByLife}
                      >
                        <DeleteIcon />
                        Удалить участника
                      </Button>
                      <UploadButtons
                        uploadFile={partUploadFile}
                        id={part.id}
                        inputProps={{
                          'data-id': part.id,
                        }}
                      />
                    </Grid>
                  </Grid>
                </ListItem>
              )
            })
          }
        </List>
        { rate.statusLife === rateStatusLive.new &&
          <Button
            variant="contained"
            color="primary"
            onClick={addParty}
            disabled={isFetching || isDisabledByLife}
          >
            <AddCircleIcon /> Добавить участника
          </Button>
        }
        { !isDisabledByLife &&
          <Button
            variant="contained"
            color="primary"
            disabled={isFetching}
            onClick={ rate._id ? handleChangeRate : handleCreteNewRate}
          >
            <SaveIcon /> {rate._id ? 'Сохранить ставку' : 'Создать ставку'}
          </Button>
        }
        {
          (rate.statusLife === rateStatusLive.active || rate.statusLife === rateStatusLive.new) &&
          <Button
            variant="contained"
            color="primary"
            name={rateStatusLive.finish}
            onClick={handleChangeRateLiveByID}
            disabled={isFetching || isDisabledByLife}
          >
            <SaveIcon /> Завершить ставку
          </Button>
        }
        {
          rate.statusLife === rateStatusLive.finish && !paymentPercentage &&
            <Button
              variant="contained"
              color="primary"
              onClick={handlePaymentRateByBlock}
            >
              <MonetizationOnIcon /> Сделать выплаты
            </Button>
        }
        {
          rate.statusLife === rateStatusLive.finish &&
            <Button
              variant="contained"
              color="primary"
              name={rateStatusLive.archive}
              onClick={handleChangeRateLiveByID}
            >
              <SaveIcon /> Добавить в архив
            </Button>
        }

        <AlertDialogSlide
          {...alertDate}
          setAlertDate={setAlertDate}
        />
      </form>
    </>
  )
}

FormRate.propTypes = {
  creteNewRate: PropTypes.func,
  changeImg: PropTypes.func,
  putRateByID: PropTypes.func,
  putRateLiveByID: PropTypes.func,
  putPaymentRateByBlock: PropTypes.func,
  getRateByID: PropTypes.func,
  getBlockById: PropTypes.func,
  paymentPercentage: PropTypes.func,
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
    putRateByID,
    putRateLiveByID,
    putPaymentRateByBlock,
    getRateByID,
    getBlockById,
    changeImg,
  }
)(FormRate);
