import React, { Component } from 'react';

import PropTypes from 'prop-types';

import './style.css';

class CreateNewUser extends Component {
  constructor(props) {
		super(props);
		this.state = {
      data: {
        email: '',
        password: '',
        userName: '',
      },
		}
	}

  // componentDidMount() {
  // }
  //
  // componentWillUnmount() {
  // }

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

  render() {
    const {
      handleChange,
      handleAuth,
      handleCreateNewUser,
    } = this.props;

    // const {
    // } = this.state;

    return(
      <div
        className="login"
      >
        <form className="login_form">
          <div className="login_title" >Регистрация</div>
          <div>
            <label className="login__label">
                <span className="login__label-value">Электронная почта</span>
              <input
                onChange={this.handleChange}
                placeholder="Ввидите электронная почту"
                className="login__input"
                type="email"
                name="email"
              >
              </input>
            </label>
            <label className="login__label">
              <span className="login__label-value">Пароль</span>
              <input
                onChange={this.handleChange}
                placeholder="Ввидите пароль"
                className="login__input"
                type="password"
                name="password"
              >
              </input>
            </label>
            <label className="login__label">
              <span className="login__label-value">Имя</span>
              <input
                onChange={this.handleChange}
                placeholder="Ввидите имя"
                className="login__input"
                type="text"
                name="userName"
              >
              </input>
            </label>
          </div>
          <div className="login__btn-group">
            <input
              className="login__btn"
              type="button"
              value="Зарегистрирлваться"
              onClick={handleAuth}
            />
          </div>
        </form>
      </div>
    )
  }
}

CreateNewUser.propType = {
  // handleChange: PropTypes.func,
  // handleAuth: PropTypes.func,
  // handleCreateNewUser: PropTypes.func,
}

export default CreateNewUser;
