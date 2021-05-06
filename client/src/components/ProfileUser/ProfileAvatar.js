import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { Col } from 'react-bootstrap';
import ImageUploded from '../../widgets/ImageUploded';

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
    lang,
    handleUploded
  } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Avatar
        alt="Avatar"
        src={(avatar && ('/media/image/' + avatar)) || srcImage}
        className={classes.large}
      />
      {
        isPageAuth &&
        <ImageUploded
          lang={lang}
          changeImg={handleUploded}
        />
      }
    </div>
  );
}
