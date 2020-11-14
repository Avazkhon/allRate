import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import injectSheet from 'react-jss';
import {
  AiOutlineFileProtect,
  AiOutlineFileSearch,
  AiOutlineForm,
  AiOutlineFile,
} from "react-icons/ai";
import { RiFileSearchLine } from "react-icons/ri";

import {
  Nav,
  Modal,
  ListGroup,
  Row,
  Col,
} from 'react-bootstrap';

import PostForm from 'components/PostForm';

import style from './style';

class UserBtnGroup extends Component {
  constructor(props) {
    super(props);
    this.size = 17;
    this.state = {
      isCreatePost: false,
    }
  }

  handleCreatePost = () => {
    this.setState((prevState) => ({
      isCreatePost: !prevState.isCreatePost
    }))
  }

  renderLink = () => {
    const {
      classes,
      isPageAuth,
    } = this.props;
    return (
      <ListGroup horizontal>
        { isPageAuth &&
          <ListGroup.Item
            className={classes.btn}
            onClick={this.handleCreatePost}
          >
            <AiOutlineForm size={this.size} title="Создать пост" />
          </ListGroup.Item>
        }
        <ListGroup.Item>
          <Link
            className={classes.btn}
            to='?page=1&limit=24#content=my_posts'
          >
            <AiOutlineFileProtect size={this.size} title="мои посты" />
          </Link>
        </ListGroup.Item>
        <ListGroup.Item>
          <Link
            className={classes.btn}
            to='?page=1&limit=24#content=subscribtion_posts'
          >
            <AiOutlineFileSearch size={this.size} title="мои новости" />
          </Link>
        </ListGroup.Item>
        <ListGroup.Item>
          <Link
            className={classes.btn}
            to='?page=1&limit=24#content=my_rates'
          >
            <AiOutlineFile size={this.size} title="мой ставки"/>
          </Link>
        </ListGroup.Item>
        <ListGroup.Item>
          <Link
            className={classes.btn}
            to='?page=1&limit=24#content=subscribtion_rates'
          >
            <RiFileSearchLine size={this.size} title="подписка на ставки" />
          </Link>
        </ListGroup.Item>
      </ListGroup>
    )
  }

  render() {
    const {
      isCreatePost,
    } = this.state;

    return (
      <>
        <Row>
          <Col lg={{ offset: 4 }} md={{ offset: 3 }} sm={{ offset: 1 }} >
            {
              this.renderLink()
            }
          </Col>
        </Row>
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

export default injectSheet(style)(
  connect(mapStateToProps, {})(UserBtnGroup)
);
