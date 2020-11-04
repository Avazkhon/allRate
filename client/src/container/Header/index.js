import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import { Link } from "react-router-dom";
import { IoIosAlert } from "react-icons/io";

import {
  Navbar,
  Nav,
  Button,
  Modal,
} from 'react-bootstrap';

import Language from 'widgets/Language';

import style from './style';
import Auth from '../../components/Auth';

import { isBrowser } from '../../utils';

import {
  authoLogin,
  authoLogAut,
  getUserById,
  getLang,
} from 'actions';

import {
  getDataUserFromLocalStorag,
} from 'utils';

const navBar = [
  { id: 1, name: { EN: 'Home', RU: 'Главная' }, url: '/'},
  { id: 3, name: { EN: 'Me page', RU: 'Моя страница' }, url: '/me'},
  { id: 4, name: { EN: 'Help', RU: 'Помощь' }, url: '/help'},
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

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.headerAauth = React.createRef();

    this.state = {
      data: {
        email: '',
        password: ''
      },
      isAuth: false,
    }
  }

  componentDidMount() {
    const {
      getUserById,
      getLang,
    } = this.props;
    getLang();
    const user = getDataUserFromLocalStorag();
    if (user && user.userId) {
      getUserById(user.userId);
    }
 }

  showModal = () => {
    this.setState((prevState) => ({
      isAuth: !prevState.isAuth
    }));
  }


  handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      data: {
        ...this.state.data,
        [name]: value
      }
    })
  }

  handleAuth = () => {
    this.setState((prevState) => ({ isAuth: !prevState.isAuth }))
  }

  handleSubmitAuth = () => {
    const {
      data,
    } = this.state;
    const {
      auth,
      authoLogAut,
      authoLogin,
    } = this.props;
    if (auth.auth && auth.auth.userId) {
      authoLogAut(data);
    } else {
      authoLogin(data)
      .then((action) => {
        if (action.status === 'SUCCESS') {
          this.setState((prevState) => ({ isAuth: !prevState.isAuth }));
        }
      });
    }
  }

  render() {
    const {
      auth,
      classes,
      lang: {
        lang
      },
    } = this.props;

    const {
      isAuth,
    } = this.state;

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
          <Language
          />
          <Nav className={classes.header__auth} ref={this.headerAauth}>
            <Button
              variant="primary"
              onClick={ isLogin ? this.handleSubmitAuth : this.handleAuth}
            >
              {isLogin ? loginText.Logout[lang] :  loginText.Login[lang]}
            </Button>
            <Modal show={isAuth} onHide={this.showModal} backdropClassName="black">
              <Modal.Header closeButton>
                <Modal.Title>Авторизация</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Auth
                  isHeader
                  handleChange={this.handleChange}
                  handleAuth={this.handleSubmitAuth}
                  error={auth.error}
                />
              </Modal.Body>
            </Modal>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
};

Header.propTypes = {
  authoLogin: PropTypes.func,
  lang: PropTypes.shape({}),
  auth: PropTypes.shape({}),
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
  getLang,
})(Header));
