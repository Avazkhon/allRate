import React from 'react';

import Auth from '../../components/auth'

import './style.css';

class PageAuth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        email: '',
        password: ''
      }
    }
  }

  // componentDidMount() {
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

  handleAuth = () => {
    const {
      data,
    } = this.state;
    fetch('http://localhost:8080/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      credentials: "include",
      body: JSON.stringify(data),
    }).then((action) => {
      console.log(action);
    })
  }

  render() {
    return (
      <div className="page-auth">
        <div className="page-auth__connect">
          <Auth
            handleAuth={this.handleAuth}
            handleChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}

export default PageAuth;
