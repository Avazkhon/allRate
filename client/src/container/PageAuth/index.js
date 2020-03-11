import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import Layout from '../Layout';

import Auth from '../../components/auth';
import CreateNewUser from '../../components/createNewUser';

import {
  authRegistration,
  authoLogin,
  createNewUser,
} from '../../actions'

import './style.css';

class PageAuth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        email: '',
        password: ''
      },
      isCreateNewUser: false,
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

  handleCreateNewUser = () => {
    this.setState(prevState => ({ isCreateNewUser: !prevState.isCreateNewUser }));
  }

  handleCheckEmailExists = () => {
    this.props.authRegistration().then(action => console.log('action', action));
  }

  handleAuth = () => {
    const {
      data,
    } = this.state;
    this.props.authoLogin(data)
  }

  render() {
    const {
      auth,
      createNewUser,
    } = this.props;

    const {
      isCreateNewUser,
    } = this.state;

    let isRedirectHome;
    if (auth && auth.auth && auth.auth.userId) {
      isRedirectHome = true;
    }

    return (
      <Layout>
        <div className="page-auth">
        {
          isRedirectHome && <Redirect push to="/me" />
        }
          <div className="page-auth__connect">
          {
            !isCreateNewUser &&
            <Auth
              handleAuth={this.handleAuth}
              handleChange={this.handleChange}
              handleCreateNewUser={this.handleCreateNewUser}
            />
          }

          {
            isCreateNewUser &&
            <CreateNewUser
              handleReturnLogin={this.handleCreateNewUser}
              createNewUser={createNewUser}
              handleCreateNewUser={this.handleCreateNewUser}
            />
          }
          </div>
        </div>
      </Layout>
    );
  }
}

PageAuth.propType = {
  authRegistration: PropTypes.func,
  createNewUser: PropTypes.func,
  authoLogin: PropTypes.func,
  auth: PropTypes.shape({}),
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
  authRegistration,
  authoLogin,
  createNewUser,
})(PageAuth);
