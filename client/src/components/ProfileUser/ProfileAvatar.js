import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import ImageUploded from '../../widgets/ImageUploded';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import UploadButtons from '../../widgets/UploadButtons';
import Albums from '../ImageList';
import { Form } from 'react-bootstrap';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  large: {
    width: theme.spacing(18),
    height: theme.spacing(18),
  },
}));

const srcImage = 'https://img.favpng.com/8/0/5/computer-icons-user-profile-avatar-png-favpng-6jJk1WU2YkTBLjFs4ZwueE8Ub.jpg'

export default function ImageAvatars(props) {
  const {
    avatar,
    isPageAuth,
    handleUploded,
    handleChangeAvatar,
    alt,
  } = props;
  const classes = useStyles();
  const [showModalSelectImage, setShowModalSelectImage] = useState(false);
  const [image, setImage] = useState(null);
  const [imageId, setImageId] = useState(null);

  function handleShowModalSelectImage() {
    setShowModalSelectImage(!showModalSelectImage)
  }

  function handleCancelShowModalSelectImage() {
    setShowModalSelectImage(false)
  }

  function handleChangeAvatarWrapper(imageId) {
    setImageId(imageId)
  }

  function handleSelectImage(event) {
    event.persist()
    setImage(event.target.files[0])
  }

  function handleUploadedWrapper() {
    if (imageId) {
      handleCancelShowModalSelectImage()
      return handleChangeAvatar (imageId)
    }
    if (image) {
      handleCancelShowModalSelectImage()
      return  handleUploded([image])
    }
  }

  return (
    <div className={classes.root}>
      <Avatar
        alt={alt || 'Avatar'}
        src={(avatar && ('/media/image/' + avatar)) || srcImage}
        className={classes.large}
      />
      {
        isPageAuth &&
        <Button
          color="primary"
          onClick={handleShowModalSelectImage}
          >
          Выбрать фото
        </Button>
      }

      <Dialog
        open={showModalSelectImage}
        onClose={handleCancelShowModalSelectImage}
      >
        <DialogTitle>
          Выбор изображения
        </DialogTitle>
        <DialogContent>
          <UploadButtons
            id={1}
            uploadFile={handleSelectImage}
          />
          <Albums
            onSelectImageFromAlbums={handleChangeAvatarWrapper}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCancelShowModalSelectImage} color="primary">
            Назад
          </Button>
          <Button onClick={handleUploadedWrapper} color="primary">
            ОК
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
