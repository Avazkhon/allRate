import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  Form,
  Button,
} from 'react-bootstrap';

class PostFrom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      text: '',
    }
  }

  render() {
    const {
      title,
      text,
    } = this.state;
    return (
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Заголовок</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            value={title}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Пост</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter text"
            value={text}
          />
        </Form.Group>
        <Button variant="primary">
          Submit
        </Button>
      </Form>
    );
  }
}

PostFrom.propType = {
  auth: PropTypes.shape({}),
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
})(PostFrom);
