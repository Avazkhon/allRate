import React, { Component } from 'react';

import PropTypes from 'prop-types';

import './style.css';

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
      handleChange
    } = this.props;

    // const {
    // } = this.state;

    return(
      <div
        className="login"
      >
        <form className="login_form">
          <div>
            <label className="login__label">
                <span className="login__label-value">Email</span>
              <input
                onChange={handleChange}
                placeholder="Enter email"
                className="login__input"
                type="email"
                name="email"
              >
              </input>
            </label>
            <label className="login__label">
              <span className="login__label-value">Password</span>
              <input
                onChange={handleChange}
                placeholder="Enter password"
                className="login__input"
                type="password"
                name="password"
              >
              </input>
            </label>
          </div>
          <div className="login__btn-group">
            <input
              className="login__btn"
              type="button"
              value="Log in"
            />
            <input
              className="login__btn"
              type="button"
              value="Registration"
            />
            <input
              className="login__btn"
              type="button"
              value="Forgot password?"
            />
          </div>
        </form>
      </div>
    )
  }
}

Auth.propType = {
  handleChange: PropTypes.func,
}

export default Auth;
