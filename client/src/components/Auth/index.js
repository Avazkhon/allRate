import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

import {
  Form,
  Button,
  Row,
  Col,
} from 'react-bootstrap';

import style from './style';

class Auth extends Component {
  constructor(props) {
		super(props);
		this.state = {
		}
	}

  // componentDidMount() {
  // }
  //
  // componentWillUnmount() {
  // }

  render() {
    const {
      handleChange,
      handleAuth,
      handleCreateNewUser,
      isHeder,
      classes,
    } = this.props;

    // const {
    // } = this.state;

    return(
      <Form className={classes.auth} >
        <Row>
          <Col xs="12">
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Э-почта</Form.Label>
              <Form.Control
                  onChange={handleChange}
                  placeholder="Ввидите электонную почту"
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
                placeholder="Ввидите пароль"
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
            !isHeder &&
            <Col xs="12" sm="4">
              <Button>Забыли пароль?</Button>
            </Col>
          }
        </Row>
      </Form>
    )
  }
};

Auth.propType = {
  handleChange: PropTypes.func,
  handleAuth: PropTypes.func,
  handleCreateNewUser: PropTypes.func,
  isHeder: PropTypes.bool,
  classes: PropTypes.shape({})
}

export default injectSheet(style)(Auth);
