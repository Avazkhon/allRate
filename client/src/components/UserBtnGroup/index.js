import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useLocation } from 'react-router-dom';
import { parse } from 'querystring';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import {
  AiOutlineFileProtect,
  AiOutlineFileSearch,
  AiOutlineFile,
} from "react-icons/ai";

import { RiFileSearchLine } from "react-icons/ri";

import PostForm from 'components/PostForm';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  button: {
    marginBottom: 0,
  },
  link: {
    '&:hover': {
      textDecoration: 'none'
    }
  }
}));

function UserBtnGroup(props) {
  const {
    isPageAuth,
  } = props;
  const classes = useStyles();
  const location = useLocation();
  const [isCreatePost, setCreatePost] = useState(false);

  const content = parse(location.hash);

  function handleCreatePost() {
    setCreatePost(!isCreatePost)
  }

  return (
    <div className={classes.root}>
      {
        isPageAuth && (
          <ButtonGroup size="small" aria-label="small outlined button group">
            <Button
              onClick={handleCreatePost}
            >
              <Typography className={classes.button} variant="caption" display="block" gutterBottom color="textSecondary">
                Создать пост
              </Typography>
            </Button>
            <Button
              className={classes.link}
            >
              <Link
                className={classes.link}
                to="/create-rate"
              >
                <Typography className={classes.button} variant="caption" display="block" gutterBottom color="textSecondary">
                  Создать ставку
                </Typography>
              </Link>
            </Button>
            <Button
              className={classes.link}
            >
              <Link className={classes.link} to='/albums'>
                <Typography className={classes.button} variant="caption" display="block" gutterBottom color="textSecondary">
                  Альбом
                </Typography>
              </Link>
            </Button>
          </ButtonGroup>
        )
      }
      <ButtonGroup size="small" aria-label="small outlined button group">
        <Button
          disabled={content['#content'] === 'my_posts' || !content['#content']}
        >
          {
            <Link
              className={classes.link}
              to="?page=1&limit=24#content=my_posts"
            >
              <AiOutlineFileProtect title="Мои посты" />
              <Typography className={classes.button} variant="caption" display="block" gutterBottom color="textSecondary">
                Мой посты
              </Typography>
            </Link>
          }
        </Button>
        <Button
          disabled={content['#content'] === 'subscribtion_posts'}
        >
          {
            <Link
              className={classes.link}
              to="?page=1&limit=24#content=subscribtion_posts"
            >
              <AiOutlineFileSearch title="Мои новости" />
              <Typography className={classes.button} variant="caption" display="block" gutterBottom color="textSecondary">
                Мои новости
              </Typography>
            </Link>
          }
        </Button>
        <Button
          disabled={content['#content'] === 'my_rates'}
        >
          {
            <Link
              className={classes.link}
              to="?page=1&limit=24#content=my_rates"
            >
              <AiOutlineFile title="Мой ставки"/>
              <Typography className={classes.button} variant="caption" display="block" gutterBottom color="textSecondary">
                Мой ставки
              </Typography>
            </Link>
          }
        </Button>
        <Button
          disabled={content['#content'] === 'subscribtion_rates'}
        >
          {
            <Link
              className={classes.link}
              to="?page=1&limit=24#content=subscribtion_rates"
            >
              <RiFileSearchLine title="Подписка на ставки" />
              <Typography className={classes.button} variant="caption" display="block" gutterBottom color="textSecondary">
                Подписка на ставки
              </Typography>
            </Link>
          }
        </Button>
      </ButtonGroup>
      <Modal show={isCreatePost} onHide={handleCreatePost}>
        <Modal.Header closeButton>
          <Modal.Title>Создание поста</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PostForm />
        </Modal.Body>
      </Modal>
    </div>
  );
}

UserBtnGroup.propTypes = {
  classes: PropTypes.shape(),
  isPageAuth: PropTypes.bool,
}

function mapStateToProps(state) {
  const {
    auth,
  } = state;
  return {
    auth,
  };
}

export default connect(mapStateToProps, {})(UserBtnGroup);
