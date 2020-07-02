import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import {
  Nav,
  Modal,
} from 'react-bootstrap';

import {
  getMyNews,
  getMyList,
} from 'actions';

import PostForm from 'components/PostForm';

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

    return (
      <>
        <Nav>
          <Nav.Item>
            <div onClick={this.handleCreatePost}>Создать пост</div>
          </Nav.Item>
          <Nav.Item>
            <Link
              onClick={this.handleShowlist}
              to={isShowMyNews ? '/me/?page=1&limit=3#content=my_posts' : '/me/?page=2&limit=5#content=subscribtion_posts' }
            >
              {isShowMyNews ? 'мой лист': 'мои новости'}
            </Link>
          </Nav.Item>
        </Nav>
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

export default connect(mapStateToProps, {
  getMyNews,
  getMyList,
})(UserBtnGroup);
