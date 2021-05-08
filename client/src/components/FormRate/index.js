import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import { useHistory } from "react-router-dom";

import {
  Button,
  TextField,
  List,
  ListItem,
  Grid,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import PhotoAlbumIcon from '@material-ui/icons/PhotoAlbum';
import SaveIcon from '@material-ui/icons/Save';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

// import { Albums } from '../Albums';

import AlertDialogSlide from 'widgets/AlertDialogSlide';
import UploadButtons from 'widgets/UploadButtons';
import RecursiveTreeView from 'widgets/RecursiveTreeView';

import {
  creteNewRate,
  putRateByID,
  putRateLiveByID,
  putPaymentRateByBlock,
  getRateByID,
  getBlockById,
  changeImg,
  getCategories,
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
  button: {
    margin: '10px',
  }
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
    getCategories,
  }
) {
  const classes = useStyles();
  let history = useHistory();

  const [rate, setChangeRate] = useState({
    title: '',
    description: '',
    dateStart: '',
    dateFinish: '',
    categories: {}
  })

  const [alertDate, setAlertDate] = useState({
    title: '',
    description: '',
    type: 'error',
  })

  const [party, setChangeParty] = useState(() => ([]))
  const [isFetching, setStatusFinish] = useState(false)
  const [isShowCategories, setShowCategories] = useState(false)
  const [isShowModalAlbum, setShowModalAlbum] = useState(false)
  const [isShowModalAlbumParty, setShowModalAlbumParty] = useState(false)
  const [categoriesData, setCategoriesData] = useState({})

  const [imageId, setImageId] = useState(null)
  const [uploadImgRate, setUploadImgRate] = useState(null)
  const [uploadImgParty, setUploadImgParty] = useState(null)
  const [uploadImgIdParty, setUploadImgIdParty] = useState(null)



  useEffect(() => {
    getCategories()
      .then((action) => {
        if (action.status === 'SUCCESS') {
          setCategoriesData(action.response)
        }
      })
  }, [])

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


  function handleShowCategories() {
    setShowCategories(!isShowCategories)
  }

  function setCategories(categories) {
    setChangeRate({ ...rate, categories })
  }

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
      party,
      img: imageId
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
      party,
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

  function partUploadFile(image, id) {
    changeImg([image])
    .then((action) => {
      if(action.status === 'SUCCESS') {
        const updadetParty = party.map((part) => {
          if (part.id == Number(id)) {
            part.img = action.response[0].imageName;
          }
          return part
        })
        putRateByID({ ...rate, party: updadetParty })
        .then((action) => {
          if (action.status === 'SUCCESS') {
            setChangeRate(action.response)
          }
        })
      }
    })
  }

  function uploadFile(image) {
    changeImg([image])
    .then((action) => {
      if(action.status === 'SUCCESS') {
        putRateByID({_id: rate._id, img: action.response[0].imageName })
          .then((action) => {
            if (action.status === 'SUCCESS') {
              setChangeRate(action.response)
            }
          })
      }
    })
  }

  function handleShowModalAlbums() {
    setShowModalAlbum(!isShowModalAlbum)
  }

  function handleShowModalAlbumsParty() {
    setShowModalAlbumParty(!isShowModalAlbumParty)
  }

  function handleSelectImageIdFromAlbums(imageId) {
    setImageId(imageId)
  }

  function handleSelectImageIdFromAlbumsParty(imageId, id) {
    setUploadImgIdParty({imageId, id})
  }

  function handleSelectImageFileFromAlbums(event) {
    setUploadImgRate(event.target.files[0])
  }

  function handleSaveImageRateImg() {
    setShowModalAlbum(false)
    if (uploadImgRate) {
      uploadFile(uploadImgRate)
      setUploadImgRate(null);
    }
    if (imageId){
      putRateByID({_id: rate._id, img: imageId })
        .then((action) => {
          if (action.status === 'SUCCESS') {
            setChangeRate(action.response);
            setImageId(null);
          }
        })
    }
  }

  function handleSaveImagePartyImg() {
    setShowModalAlbumParty(false)
    if (uploadImgParty) {
      partUploadFile(uploadImgParty.img, uploadImgParty.id)
      setUploadImgParty(null)
    }
    if (uploadImgIdParty){
      const updadetParty = party.map((part) => {
        if (part.id == uploadImgIdParty.id) {
          part.img = uploadImgIdParty.imageId;
        }
        return part
      })
      putRateByID({ ...rate, party: updadetParty })
        .then((action) => {
          if (action.status === 'SUCCESS') {
            setChangeRate(action.response)
          }
        })
    }
  }

  function handleSelectImagePartyImg(event, id) {
    setUploadImgParty({img: event.target.files[0] , id})
  }

  const isDisabledByLife =
    (rate.statusLife === rateStatusLive.finish)
    || (rate.statusLife === rateStatusLive.archive)
    || (rate.statusLife === rateStatusLive.in_progress)


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
              multiline
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
              <Grid item xs={12}>
                <Button
                  className={classes.button}
                  size="small"
                  variant="contained"
                  color="secondary"
                  onClick={handleShowCategories}
                  disabled={isFetching || isDisabledByLife}
              >

                Выбрать категорию
              </Button>
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
                  !isDisabledByLife && (
                    <Button
                      onClick={handleShowModalAlbums}
                      variant="contained"
                      color="primary"
                      component="span"
                    >
                      <PhotoAlbumIcon />
                    </Button>
                  )
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
                    <Grid xs={12}>
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
                        multiline
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
                    <Grid item xs={10} sm={6}>
                      <Button
                        className={classes.button}
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
                    </Grid>
                    { isFetching || !isDisabledByLife &&
                      <Grid item xs={2} sm={6}>
                        <Button
                          onClick={handleShowModalAlbumsParty}
                          variant="contained"
                          color="primary"
                          component="span"
                        >
                          <PhotoAlbumIcon />
                        </Button>
                        <Dialog
                          open={isShowModalAlbumParty}
                          onClose={handleShowModalAlbumsParty}
                        >
                          <DialogTitle>
                            Выбор изображения
                          </DialogTitle>
                          <DialogContent>
                            <UploadButtons
                              uploadFile={(event) => handleSelectImagePartyImg(event, part.id)}
                              id={part.id}
                              inputProps={{
                                'data-id': part.id,
                              }}
                            />
                            {/*<Albums*/}
                            {/*  onSelectImageFromAlbums={(imageId) => handleSelectImageIdFromAlbumsParty(imageId, part.id)}*/}
                            {/*/>*/}
                          </DialogContent>
                          <DialogActions>
                            <Button autoFocus onClick={handleShowModalAlbumsParty} color="primary">
                              Назад
                            </Button>
                            <Button onClick={handleSaveImagePartyImg} color="primary">
                              ОК
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </Grid>
                    }
                  </Grid>
                </ListItem>
              )
            })
          }
        </List>
        { rate.statusLife === rateStatusLive.new &&
          <Button
            className={classes.button}
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
            className={classes.button}
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
            className={classes.button}
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
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={handlePaymentRateByBlock}
              disabled={rate.statusLife === rateStatusLive.in_progress}
            >
              <MonetizationOnIcon /> Сделать выплаты
            </Button>
        }
        {
          rate.statusLife === rateStatusLive.finish &&
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              name={rateStatusLive.archive}
              onClick={handleChangeRateLiveByID}
            >
              <SaveIcon /> Добавить в архив
            </Button>
        }

        <Dialog
          open={isShowModalAlbum}
          onClose={handleShowModalAlbums}
        >
          <DialogTitle>
            Выбор изображения
          </DialogTitle>
          <DialogContent>
            <UploadButtons
              id={1}
              uploadFile={handleSelectImageFileFromAlbums}
            />
            {/*<Albums*/}
            {/*  onSelectImageFromAlbums={handleSelectImageIdFromAlbums}*/}
            {/*/>*/}
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleShowModalAlbums} color="primary">
              Назад
            </Button>
            <Button onClick={handleSaveImageRateImg} color="primary">
              ОК
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={isShowCategories}
          onClose={handleShowCategories}
        >
          <DialogTitle>
            Выбор места в меню
          </DialogTitle>
          <DialogContent>
            <RecursiveTreeView
              handleSelectCategories={setCategories}
              categoriesData={categoriesData}
            />
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleShowCategories} color="primary">
              Назад
            </Button>
            <Button onClick={handleShowCategories} color="primary">
              ОК
            </Button>
          </DialogActions>
        </Dialog>

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
  getCategories: PropTypes.func,
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
    getCategories,
  }
)(FormRate);
