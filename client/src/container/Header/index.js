import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import { Link } from "react-router-dom";
import { IoIosAlert } from "react-icons/io";
import Cookies from 'js-cookie';

import {
  Navbar,
  Nav,
  Button,
  Modal,
} from 'react-bootstrap';


import style from './style';
import Auth from '../../components/Auth';

import {
  authoLogin,
  authoLogAut,
  getUserById,
  // getLang,
} from 'actions';

import {
  getDataUserFromLocalStorag,
} from 'utils';
import { List, ListItem, ListItemText } from '@material-ui/core';

const navBar = [
  { id: 1, name: { EN: 'Home', RU: 'Главная' }, url: '/'},
  { id: 3, name: { EN: 'Me page', RU: 'Моя страница' }, url: '/me'},
  { id: 4, name: { EN: 'Documentation', RU: 'Документация' }, url: '/docs'},
  { id: 5, name: { EN: 'Help', RU: 'Помощь' }, url: '/help'},
];


const loginText = {
  Logout: {
    EN: 'Logout',
    RU: 'Выйти'
  },
  Login: {
    EN: 'Login',
    RU: 'Войти'
  },
  alert: {
    EN: 'The service is in development mode',
    RU: 'Сервис работает в режиме разработки'
  }
};


function Header({
  getUserById,
  // getLang,
  auth,
  authoLogAut,
  authoLogin,
  classes,
  lang: {
    lang
  },
}) {
  const headerAauth = React.createRef();

  const [ data, setData ] = useState({
    data: {
      email: '',
      password: ''
    },
    isAuth: false,
  })


  useEffect(() => {
    // getLang();
    const user = getDataUserFromLocalStorag();
    if (user && user.userId) {
      getUserById(user.userId);
    }
  }, [])

  function showModal() {
    setData((prevState) => ({
      ...prevState,
      isAuth: !prevState.isAuth
    }));
  }


  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setData({
        ...data,
        [name]: value
    })
  }

  function handleAuth() {
    setData((prevState) => ({...prevState, isAuth: !prevState.isAuth }))
  }

  function handleSubmitAuth() {

    if (auth.auth && auth.auth.userId) {
      authoLogAut(data)
        .then((action) => {
          if (action.status === 'SUCCESS') {
            Cookies.remove('userId');
          }
        });
    } else {
      authoLogin(data)
      .then((action) => {
        if (action.status === 'SUCCESS') {
          document.cookie = `userId=${action.response.userId}; path=/; expires=Tue ${new Date(Date.now() + 1000 * 60 * 60 * 24 * 3)}`;
          setData((prevState) => ({...prevState, isAuth: !prevState.isAuth }));
        }
      });
    }
  }
    const isLogin = auth.auth && auth.auth.userId;

  return (
    <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
      <Navbar.Brand href="/">Face Betting</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <IoIosAlert size="21" color="red" title={loginText.alert[lang]}/>
        <Nav className="mr-auto">
          {navBar.map((itm) => {
            if (!isLogin && itm.url === '/me') {
              return
            }
            return (
              <Link className={classes['nav-link']} to={itm.url} key={itm.id} ><span>{itm.name[lang]}</span></Link>
            )
          })}
        </Nav>
        {
          // Пока делать только русский язык
          // <Language />
        }
        <Nav className={classes.header__auth} ref={headerAauth}>
          <Button
            variant="primary"
            onClick={ isLogin ? handleSubmitAuth : handleAuth}
          >
            {isLogin ? loginText.Logout[lang] :  loginText.Login[lang]}
          </Button>
          <Modal show={data.isAuth} onHide={showModal} backdropClassName="black">
            <Modal.Header closeButton>
              <Modal.Title>Авторизация</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Auth
                isHeader
                handleChange={handleChange}
                handleAuth={handleSubmitAuth}
                error={auth.error}
              />
            </Modal.Body>
          </Modal>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

Header.propTypes = {
  authoLogin: PropTypes.func,
  getUserById: PropTypes.func,
  // getLang: PropTypes.func,
  authoLogAut: PropTypes.func,
  lang: PropTypes.shape(),
  auth: PropTypes.shape(),
  classes: PropTypes.shape(),
}

function mapStateToProps(state) {
  const {
    auth,
    lang
  } = state;
  return {
    auth,
    lang,
  };
}

export default injectSheet(style)(connect(mapStateToProps, {
  authoLogin,
  authoLogAut,
  getUserById,
  // getLang,
})(Header));
