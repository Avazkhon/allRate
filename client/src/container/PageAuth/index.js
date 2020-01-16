import React from 'react';
import PropTypes from 'prop-types';
import {connect } from 'react-redux';

import Auth from '../../components/auth';

import {
  authRegistration
} from '../../actions'

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
  handleCheckEmailExists = () => {
    this.props.authRegistration().then(action => console.log('action', action));
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
      // console.log(action);
    })
  }

  render() {
    return (
      <div className="page-auth">
        <div className="page-auth__connect">
          <Auth
            handleAuth={this.handleAuth}
            handleChange={this.handleChange}
            handleCheckEmailExists={this.handleCheckEmailExists}
          />
        </div>
      </div>
    );
  }
}

PageAuth.propType = {
  authRegistration: PropTypes.func
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, {
  authRegistration,
})(PageAuth);
