import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Link } from "react-router-dom";

import './style.css';
import Auth from '../../components/auth';

import {
  authoLogin,
} from '../../actions';

const navBar = [
  { id: 1, name: 'Главная', url: '/'},
  { id: 3, name: 'Моя стриница', url: '/me'},
  { id: 4, name: 'Помощь', url: '/help'},
  { id: 5, name: 'Логин', url: '/auth'},
]

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        email: '',
        password: ''
      },
      isCreateNewUser: false,
      isAuth: false,
    }
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
    this.props.authoLogin(data).then(action => {
      if (action.status === 'SUCCESS') {
        this.handleAuth()
      } else {
        alert(action.message)
      }
    });
  }

  relactionForCreateNewUser = () => {
    return <Redirect to='/auth' />
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
        <div className="header__auth">
          <div className="header_container">
            <input
              className="header__auth-btn"
              type="button"
              value={isLogin ? 'Выйти' : 'Зайти'}
              onClick={ isLogin ? this.handleSubmitAuth : this.handleAuth}
            />
            {
              isAuth &&
              <Auth
                isHeder
                handleChange={this.handleChange}
                handleAuth={this.handleSubmitAuth}
                handleCreateNewUser={this.relactionForCreateNewUser}
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
