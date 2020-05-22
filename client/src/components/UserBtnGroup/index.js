import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Nav,
  Modal,
} from 'react-bootstrap';

import PostForm from 'components/PostForm';

class UserBtnGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCreatePost: false,
    }
  }

  handleCreatePost = () => {
    this.setState((prevState) => ({
      isCreatePost: !prevState.isCreatePost
    }))
  }

  render() {
    const {
      isCreatePost,
    } = this.state;

    return (
      <>
        <Nav>
          <Nav.Item>
            <Nav.Link onClick={this.handleCreatePost}>Создать пост</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>мой новости</Nav.Link>
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

UserBtnGroup.propType = {
  // isCreatePost: PropTypes.string.isRequired,
}

export default UserBtnGroup;
