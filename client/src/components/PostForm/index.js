import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  Form,
  Button,
} from 'react-bootstrap';

import {
  createPost,
} from 'actions';

import Messages from 'components/Messages';

class PostFrom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      text: '',

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

  handleSubmit = () => {
    const { title, text } = this.state;
    const { auth: { auth }, createPost } = this.props;
    const data = {
      title,
      text,
      authorId: auth.userId,
      createTime: new Date(),
    };

    this.makeState();

    createPost(data)
    .then((action) => {
      if (action.status === 'SUCCESS') {
        this.setState({
          warning: 'Пост успешно создан!',
          isFetching: false,
        })
      } else {
        this.setState({
          error: action.error,
          isFetching: false,
        })
      }
    })
  }

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

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Пост</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter text"
            value={text}
            name="text"
            onChange={this.handleChange}
          />
        </Form.Group>
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

PostFrom.propType = {
  auth: PropTypes.shape({}),
  createPost: PropTypes.func,
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
})(PostFrom);
