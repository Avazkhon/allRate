import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

import {
  Form,
  Button,
  Row,
  Col,
  Alert,
} from 'react-bootstrap';

import style from './style';

const Auth = ({
  handleChange,
  handleAuth,
  handleCreateNewUser,
  isHeader,
  classes,
  error,
}) => (
  <Form className={classes.auth} >
    <Row>
      <Col xs="12">
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Э-почта</Form.Label>
          <Form.Control
              onChange={handleChange}
              placeholder="Введите электронную почту"
              type="email"
              name="email"
            />
        </Form.Group>
      </Col>
    </Row>
    <Row>
      <Col>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            onChange={handleChange}
            placeholder="Введите пароль"
            type="password"
            name="password"
          />
        </Form.Group>
      </Col>
    </Row>
    <Row>
      <Col xs="12" sm="4">
        <Button
          variant="primary"
          className="login__btn"
          onClick={handleAuth}
        >
          Войти
        </Button>
      </Col>
      {
        !handleCreateNewUser &&
        <Col xs="12" sm="12">
          <Link to='/auth'>
            <span>Регистрация</span>
          </Link>
        </Col>
      }
      {
        handleCreateNewUser &&
        <Col xs="12" sm="4">
          <Button onClick={handleCreateNewUser} >Регистрация </Button>
        </Col>
      }
      {
        !isHeader &&
        <Col xs="12" sm="4">
          <div>
            <Link to='/password-recovery/userPassword'>
              <span>Забыли пароль?</span>
            </Link>
          </div>
        </Col>
      }
    </Row>
    {
      error &&
      <Alert variant="warning">{error}</Alert>
    }
  </Form>
);

Auth.propTypes = {
  handleChange: PropTypes.func,
  handleAuth: PropTypes.func,
  handleCreateNewUser: PropTypes.func,
  isHeader: PropTypes.bool,
  classes: PropTypes.shape(),
  error: PropTypes.string,
}

export default injectSheet(style)(Auth);
