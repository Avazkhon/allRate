import React,{ Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import queryString from 'query-string';
import injectSheet from 'react-jss';
import { Redirect } from 'react-router';

import {
  Row,
  Col,
  Form,
  Button,
} from 'react-bootstrap';

import Layout from 'container/Layout';
import Messages from 'components/Messages';

import {
  passwordRecoveryStart,
  passwordRecoveryFinish,
} from 'actions';

import {
  checkLength,
} from 'utils';

import style from './style';

class PasswordRecovery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      warning: '',
      error: '',
      isFetching: false,
      isValidEmail: false,
      isValidPassword: false,
    }
  }

  validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const state = {
      [name]: value
    }

    if (name === 'email' && this.validateEmail(value)) {
      state.isValidEmail = true;
    }
    if (name === 'password') {
      let isNotValidArray = [];
      checkLength(value, '', 6, 50, isNotValidArray)
      if(isNotValidArray[0] === false){
        state.isValidPassword = false;
      } else {
        state.isValidPassword = true;
      }
    }

    this.setState(state)
  }

  handleSubmitEmail = () => {
    const {
      passwordRecoveryStart,
      match: {
        params: {
          password
        }
      }
    } = this.props;
    const { email } = this.state;
    this.setState({ isFetching: true, warning: '', error: '' })
    if (password === 'userPassword') {
      passwordRecoveryStart(email)
        .then((action) => this.afterSubmit(action, 'Запрос успешно принят. На вашу почту отправлено письмо.'))
    } else if (password === 'pursePassword') {

    }
  }

  handleSubmitPassword = () => {
    const { password } = this.state;
    const {
      passwordRecoveryFinish,
      match: {
        params: {
          password: passwordParams
        }
      },
      history,
    } = this.props;
    const {
      recoveryId
    } = queryString.parse(history.location.search)
    if (passwordParams === 'userPassword') {
      passwordRecoveryFinish({password, recoveryId})
      .then((action) => this.afterSubmit(action, 'Ваш пароль успешно обновлен'))
    } else if (passwordParams === 'pursePassword') {

    }
  }

  afterSubmit = (action, warning) => {
    this.setState({ isFetching: false })
    if (action.status === 'SUCCESS') {
      this.setState({ warning })
    } else {
      this.setState({ error: action.error.messages || action.error.toString()})
    }
  }

  render() {
    const {
      warning,
      error,
      isFetching,
      isValidEmail,
      isValidPassword,
    } = this.state;

    const {
      classes,
      match: {
        params: {
          password
        }
      },
      history,
    } = this.props;
    const {
      recoveryId
    } = queryString.parse(history.location.search);

    return (
      <Layout>
        {
          (password !== 'userPassword' && password !== 'pursePassword') &&
          <Redirect to="/404" />
        }
        <Row>
          <div className={classes['page-recovery']}>
            <Col xs="12" sm="8" md="9">
              {
                !recoveryId &&
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Э-почта</Form.Label>
                  <Form.Control
                      onChange={this.handleChange}
                      placeholder="Введите электронную почту"
                      type="email"
                      name="email"
                      disabled={warning}
                    />
                </Form.Group>
              }
              {
                recoveryId &&
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Новый пароль</Form.Label>
                  <Form.Control
                      onChange={this.handleChange}
                      placeholder="Введите новый пароль"
                      type="password"
                      name="password"
                      disabled={warning}
                    />
                </Form.Group>
              }
            </Col>
            <Col>
              <Messages
                warning={warning}
                error={error}
                isFetching={isFetching}
              />
            </Col>
            <Col>
            {
              !recoveryId &&
              <Button disabled={!isValidEmail || warning} onClick={this.handleSubmitEmail} >Отправить</Button>
            }
            {
              recoveryId &&
              <Button disabled={!isValidPassword || warning} onClick={this.handleSubmitPassword} >Отправить</Button>
            }
            </Col>
          </div>
        </Row>
      </Layout>
    )
  }
}


PasswordRecovery.propTypes = {
  auth: PropTypes.shape(),
  classes: PropTypes.shape(),
  history: PropTypes.shape(),
  match: PropTypes.shape(),
  passwordRecoveryStart: PropTypes.func,
  passwordRecoveryFinish: PropTypes.func,
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
  connect(
    mapStateToProps,
    {
      passwordRecoveryStart,
      passwordRecoveryFinish,
    }
  )
  (PasswordRecovery)
);
