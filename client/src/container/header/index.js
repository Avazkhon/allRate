import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Link } from "react-router-dom";

import './style.css';
import Auth from '../../components/auth';

import { isBrowser } from '../../utils';

import {
  authoLogin,
} from '../../actions';

const navBar = [
  { id: 1, name: 'Главная', url: '/'},
  { id: 3, name: 'Моя стриница', url: '/me'},
  { id: 4, name: 'Помощь', url: '/help'},
]

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.headerAauth = React.createRef();

    this.state = {
      data: {
        email: '',
        password: ''
      },
      isCreateNewUser: false,
      isAuth: false,
    }
  }

  componentDidMount() {
   if (isBrowser()) {
    document.addEventListener('mousedown', this.leaveByClick, false);
   }
 }

 componentWillUnmount() {
  const { isMobileVersion, indexMenu } = this.props;
  if (isBrowser()) {
    document.removeEventListener('mousedown', this.leaveByClick);
  }
}

  leaveByClick = (event) => {
    const navBlock = this.headerAauth;
    const searchPanel = document.getElementsByClassName('header__auth')[0];
    const path = event.path || (event.composedPath && event.composedPath());

    if (path
      && path.includes
      && !path.includes(navBlock)
      && (!searchPanel
        || !path.includes(searchPanel)
        || event.target.classList.contains('header__auth')
      )
    ) {
      if (this.state.isAuth) {
        this.setState({
          isAuth: false
        });
      }
    }
  };


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
    this.props.authoLogin(data).then(action => {
      if (action.status === 'SUCCESS') {
        this.handleAuth()
      } else {
        alert(action.message)
      }
    });
  }

  render() {
    const {
      auth,
    } = this.props;

    const {
      isAuth,
    } = this.state;

    const isLogin = auth.data && auth.data.userId;

    return (
      <div className="header">
        <ul className="header__navbar">
          {navBar.map((itm) => {
            return (
              <li key={itm.id} className="header__item">
                <Link to={itm.url} style={{ 'textDecoration': 'none' }}>
                  <span>{itm.name}</span>
                </Link>
              </li>
            )
          })}
        </ul>
        <div className="header__auth" ref={this.headerAauth}>
          <div className="header_container">
            <input
              className="header__auth-btn"
              type="button"
              value={isLogin ? 'Выйти' : 'Войти'}
              onClick={ isLogin ? this.handleSubmitAuth : this.handleAuth}
            />
            {
              isAuth &&
              <Auth
                isHeder
                handleChange={this.handleChange}
                handleAuth={this.handleSubmitAuth}
              />
            }
          </div>
        </div>
      </div>
    );
  }
}

Header.propType = {
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
  authoLogin,
})(Header);
