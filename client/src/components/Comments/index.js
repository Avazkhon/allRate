import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import {
  TextField,
  Button,
  makeStyles,
  Snackbar
} from '@material-ui/core';

import {
  getComments,
  saveComments
} from 'actions';

import {
  Comment,
} from './Comment';
import injectSheet from 'react-jss';

import style from '../../container/Header/style';

const useStyles = makeStyles((theme) => ({
  commentText: {
    padding: 8
  },
  buttonGroup: {
    display: 'none',
    justifyContent: 'flex-end',
    padding: 8,

    '& button': {
      marginLeft: 8
    }
  },
  buttonGroupShow: {
    display: 'flex'
  }
}));

const Comments = (props) => {
  const {
    getComments,
    saveComments,
    commentsId,
    comments,
    auth
  } = props;
  const [isShowAlert, setShowAlert] = React.useState(false);
  useEffect(() => {
    getComments({ commentsId: commentsId })
  }, []);

  const classes = useStyles();
  const [value, setValue] = useState('');

  function handleSaveComment() {
    if(auth.auth?.userId) {
      saveComments({ commentsId, text: value })
        .then((action) => {
          if (action.status === 'SUCCESS') {
            setValue('')
          } else {
            setShowAlert(true)
            setTimeout(() => setShowAlert(false), 3000)
          }
        })
    } else {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  }

  return (
    <div>
      <TextField
        className={classes.commentText}
        id="filled-multiline-flexible"
        label="Комментарий"
        fullWidth
        multiline
        rowsMax={6}
        value={value}
        onChange={(event) => {setValue(event.target.value)}}
        variant="filled"
      />
      <div className={classnames(classes.buttonGroup, {
        [classes.buttonGroupShow]: value
      })}>
        <Button
          variant="contained"
          size="small"
        >
          Назад
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={handleSaveComment}
        >
          Оставить коментарии
        </Button>
      </div>
      <div>
        {
          comments.data?.comments.map((comment) => (
            <Comment key={comment._id} comment={comment} auth={auth.auth}/>
          ))
        }
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        severity="warning"
        open={isShowAlert}
        message="Внимания"
        action={
          <span>Вы не авторизованы</span>
        }
      />
    </div>
  )
}

function mapStateToProps(state) {
  const {
    auth,
    comments
  } = state;
  return {
    auth,
    comments,
  };
}


export default injectSheet(style)(connect(
  mapStateToProps,
  {
    getComments,
    saveComments
  }
)(Comments));