import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  Form,
  Button,
} from 'react-bootstrap';

import {
  createPost,
  changeImg,
  putPostById,
} from 'actions';

import Messages from 'components/Messages';
import TextEditor from 'components/TextEditor';
import UploadButtons from '../../widgets/UploadButtons';
import { Grid } from '@material-ui/core';


class PostFrom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      text: '',
      file: null,

      warning: '',
      error: '',
      isFetching: false,
    }
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
    const { title } = this.state;
    const { auth: { auth }, createPost, changeImg, putPostById } = this.props;
    const data = {
      title,
      text,
    };

    this.makeState();

    createPost(data)
    .then((action) => {
      if (action.status === 'SUCCESS') {

        changeImg([this.state.file])
          .then((imageAction) => {
            console.log(imageAction)
            if(imageAction.status === 'SUCCESS') {
              putPostById(action.response._id, { img: { url: imageAction.response.imageName } })
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
      } else {
        this.setState({
          error: action.error,
          isFetching: false,
        })
      }
    })
  }

  uploadFile = (event) => this.setState({ file: event.target.files[0] })

  render() {
    const {
      title,
      text,
      warning,
      error,
      isFetching,
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

        <UploadButtons
          id={1}
          uploadFile={this.uploadFile}
        />

        {/*<input*/}
        {/*  type="file"*/}
        {/*  accept="image/*"*/}
        {/*  onChange={}*/}
        {/*/>*/}

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
})(PostFrom);
