import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import injectSheet from 'react-jss';

import {
  Nav,
  Modal,
  ListGroup,
} from 'react-bootstrap';

import {
  getMyNews,
  getMyList,
} from 'actions';

import PostForm from 'components/PostForm';

import style from './style';

class UserBtnGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCreatePost: false,
      isShowMyNews: false,
    }
  }

  handleCreatePost = () => {
    this.setState((prevState) => ({
      isCreatePost: !prevState.isCreatePost
    }))
  }

  handleShowlist = () => {
    const {
      isShowMyNews,
    } = this.state;
    const {
      getMyNews,
      getMyList,
      auth: { auth }
    } = this.props;
    if (auth && auth.userId) {
      if (!isShowMyNews) {
        getMyNews(auth.userId)
        .then((actions) => {
          if (actions.status === 'SUCCESS') {
            this.setState((prevState) => ({
              isShowMyNews: !prevState.isShowMyNews
            }))
          }
        })
      } else {
        getMyList(auth.userId)
        .then((actions) => {
          if (actions.status === 'SUCCESS') {
            this.setState((prevState) => ({
              isShowMyNews: !prevState.isShowMyNews
            }))
          }
        })
      }
    }
  }

  render() {
    const {
      isCreatePost,
      isShowMyNews,
    } = this.state;

    const {
      classes,
    } = this.props;

    return (
      <>
      <ListGroup horizontal>
        <ListGroup.Item
          className={classes.btn}
          onClick={this.handleCreatePost}
        >
          Создать пост
        </ListGroup.Item>
        <ListGroup.Item>
          <Link
            className={classes.btn}
            onClick={this.handleShowlist}
            to={isShowMyNews ? '/me/?page=1&limit=3#content=my_posts' : '/me/?page=2&limit=5#content=subscribtion_posts' }
          >
            {isShowMyNews ? 'мой лист': 'мои новости'}
          </Link>
        </ListGroup.Item>
      </ListGroup>
        <Modal show={isCreatePost} onHide={this.handleCreatePost}>
          <Modal.Header closeButton>
            <Modal.Title>Создание поста</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <PostForm />
          </Modal.Body>
        </Modal>
      </>
    )
  }
}

UserBtnGroup.propTypes = {
  classes: PropTypes.shape(),
  getMyNews: PropTypes.func.isRequired,
  getMyList: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  const {
    auth,
  } = state;
  return {
    auth,
  };
}

export default injectSheet(style)(
  connect(mapStateToProps, {
    getMyNews,
    getMyList,
  })(UserBtnGroup)
);
