import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  Form,
} from 'react-bootstrap';

import {
  createPost,
  changeImg,
  putPostById,
  getUsersByIds,
  getPostById
} from 'actions';

import Messages from 'components/Messages';
import TextEditor from 'components/TextEditor';
import UploadButtons from '../../widgets/UploadButtons';

import Albums from '../ImageList';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';


class PostFrom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postId: null,
      title: '',
      text: '',
      file: null,
      imageId: null,

      warning: '',
      error: '',
      isFetching: false,
      showModalSelectImage: false,
    }
  }

  componentDidMount() {
    this.getPostById()
  }

  getPostById = () => {
    const {
      postId
    } = this.props;
    this.props.getPostById(postId)
      .then((action) => {
        if (action.status === 'SUCCESS') {
          const { title, text, img, _id } = action.response;
          this.setState({
            postId: _id,
            title,
            text,
            imageId: img.url,
          })
          getUsersByIds([action.response.author || action.response.authorId]);
        }
      });
  }

  makeState = () => {
    this.setState({
      warning: '',
      error: '',
      isFetching: true,
    })
  }

  handleChange = (e) => {
    const { name, value } = e.currentTarget;
    this.setState({
      [name]: value
    })
  }

  handleSubmit = (text) => {
    const { title, file, imageId, postId } = this.state;
    const { createPost, changeImg, putPostById } = this.props;
    const data = {
      title,
      text,
    };

    this.makeState();
    if (postId) {
      return this.handleChangePost(text)
    }

    createPost(data)
    .then((action) => {
      if (action.status === 'SUCCESS') {
        this.setState({postId: action.response._id})
        if (!this.state.imageId && file) {
          changeImg([file])
            .then((imageAction) => {
              if(imageAction.status === 'SUCCESS') {
                putPostById(action.response._id, { img: { url: imageAction.response[0].imageName } })
                  .then((action) => {
                    if (action.status === 'SUCCESS') {
                      this.setState({
                        warning: 'Статья успешна создана!',
                        isFetching: false,
                      })
                    }
                  })
              }
            })
        }
        if (!file && imageId) {
          putPostById(action.response._id, { img: { url: imageId } })
            .then((action) => {
              if (action.status === 'SUCCESS') {
                this.setState({postId: action.response._id})
                this.setState({
                  warning: 'Статья успешна создана!',
                  isFetching: false,
                })
              }
            })
        }

      } else {
        this.setState({
          error: action.error,
          isFetching: false,
        })
      }
    })
  }

  handleChangePost = (text) => {
    const {
      postId,
      imageId,
      title
    } = this.state;
    const {
      putPostById
    } = this.props;
    putPostById(postId, { text, title, img: { url: imageId } })
      .then((action) => {
        if (action.status === 'SUCCESS') {
          this.setState({
            warning: 'Статья успешна обновлена!',
            isFetching: false,
          })
        }
      })
  }

  uploadFile = (event) => this.setState({ file: event.target.files[0] })

  handleSelectImageIdFromAlbums = (imageId, id) => {
    this.setState({ imageId })
  }

  handleShowModalSelectImage = () => {
    this.setState((prev) => ({
      showModalSelectImage: !prev.showModalSelectImage
  }))
  }

  render() {
    const {
      title,
      text,
      warning,
      error,
      isFetching,
      showModalSelectImage
    } = this.state;

    return (
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Заголовок</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            value={title}
            name="title"
            onChange={this.handleChange}
          />
        </Form.Group>

        <Button
          color="primary"
          onClick={this.handleShowModalSelectImage}
        >
          Выбрать фото
        </Button>

        <Dialog
          open={showModalSelectImage}
          onClose={this.handleShowModalSelectImage}
        >
          <DialogTitle>
            Выбор изображения
          </DialogTitle>
          <DialogContent>
            <UploadButtons
              id={1}
              uploadFile={this.uploadFile}
            />
            <Albums
              onSelectImageFromAlbums={(imageId) => this.handleSelectImageIdFromAlbums(imageId)}
            />
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={this.handleShowModalSelectImage} color="primary">
              Назад
            </Button>
            <Button onClick={this.handleShowModalSelectImage} color="primary">
              ОК
            </Button>
          </DialogActions>
        </Dialog>

        <TextEditor
          text={text}
          handleSubmit={this.handleSubmit}
        />

        <Messages
          warning={warning}
          error={error}
          isFetching={isFetching}
        />

      </Form>
    );
  }
}

PostFrom.propTypes = {
  auth: PropTypes.shape({}),
  createPost: PropTypes.func,
  changeImg: PropTypes.func,
  putPostById: PropTypes.func,
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
  createPost,
  changeImg,
  putPostById,
  getPostById
})(PostFrom);
