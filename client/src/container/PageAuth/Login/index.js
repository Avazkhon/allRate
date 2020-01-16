import React, { Component } from 'react';

import './style.css';

class Login extends Component {
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
    // const {
    // } = this.props;

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
                placeholder="Enter email"
                className="login__input"
                type="email"
              >
              </input>
            </label>
            <label className="login__label">
              <span className="login__label-value">Password</span>
              <input
                placeholder="Enter password"
                className="login__input"
                type="password"
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

export default Login;
