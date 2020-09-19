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
} from 'actions';

import Messages from 'components/Messages';


function isValid (props) {
  if (props) {
    return  {border: '1px solid red'};
  }
}

class PostFrom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      text: '',
      file: null,

      valid: {
        title: '',
        text: '',
        file: '',
      },

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

  checkLength = (string, warning, lengthMin, lengthMax, isNotValidArray) => {
    let message = warning || 'Обезательное поле';
    if (string.length < lengthMin) {
      message += `(минимальная длина ${lengthMin})`;
      isNotValidArray.push(false);
    } else if (lengthMax && string.length > lengthMax) {
      isNotValidArray.push(false);
      message += `(максимальная длина ${lengthMax})`;
    } else {
      message = '';
    }
    return message;
  };

  checkValid() {
    const { title, text, file } = this.state;
    const isNotValidArray = [];
    const newValid = {
      title: this.checkLength(title, '', 3, 30, isNotValidArray),
      text: this.checkLength(text, '', 10, 2000, isNotValidArray),
      file: !file && 'Выберите изображения',
    };
    this.setState({valid: newValid});
    return isNotValidArray.some(isValid => !!isValid ? false : true) || newValid.file;
  }

  handleSubmit = () => {
    const { title, text, file } = this.state;
    const { auth: { auth }, createPost, changeImg } = this.props;
    const data = {
      title,
      text,
      authorId: auth.userId,
      createTime: new Date(),
    };

    if(!!this.checkValid()) return;

    this.makeState();

    createPost(data)
    .then((action) => {
      if (action.status === 'SUCCESS') {
        this.setState({
          warning: 'Пост успешно создан!',
          isFetching: false,
        })
        changeImg('post', [file], { postId: action.response._id });
      } else {
        this.setState({
          error: action.error,
          isFetching: false,
        })
      }
    })
  }

  selectFile = (e) => {
    this.setState({
      file: e.target.files[0],
    })
  }

  render() {
    const {
      title,
      text,
      warning,
      error,
      isFetching,
      valid,
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
            style={isValid(valid.title)}
            title={valid.title}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Пост</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter text"
            value={text}
            name="text"
            onChange={this.handleChange}
            style={isValid(valid.text)}
            title={valid.text}
          />
        </Form.Group>

        <input
          accept=".jpeg, .jpg"
          type="file" name="post"
          onChange={this.selectFile}
          style={isValid(valid.file)}
          title={valid.file}
        />
        <Button variant="primary" onClick={this.handleSubmit}>
          Submit
        </Button>

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
})(PostFrom);
