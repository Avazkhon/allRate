import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './style.css';

import {
  getUserById,
} from '../../actions'

class ProfileUser extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    const { getUserById, auth: { auth } } = this.props;
    if (auth && auth.userId) {
      getUserById('user/?id='+auth.userId)
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { getUserById, auth: { auth } } = prevProps;
    if (
      (auth && this.props.auth.auth
      && this.props.auth.auth.userId
      && auth.userId !== this.props.auth.auth.userId)
      || ( !auth && this.props.auth.auth.userId)
    ) {
      getUserById('user/?id='+this.props.auth.auth.userId);
    }
  }

  render() {
    const {
      auth: { userData },
    } = this.props;
    let userProps = [];
    if (userData && userData._id) {
      const {
        email,
        userName,
        phone,
      } = userData;
      userProps = [
        { name: email },
        { name: userName },
        { name: phone },
      ];
    }

    return (
      <div className="profile-user">
        <div className="profile-user__container">
          <div className='avatar'>
            <img src="#" alt="Avatar" />
          </div>
          <div className="profile-user_edit">
            <div className='profile-user-edit'>
              <input
                type="button"
                value="Редактировать"
              />
            </div>
          </div>
          <div className="profile-user__content">
            <div>
              <ul>
                {
                  userProps.map((itm) => {
                    return (
                      <li key={itm.name}>
                        {itm.name}
                      </li>
                    )
                  })
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProfileUser.propType = {
  getUserById: PropTypes.func,
  // createNewUser: PropTypes.func,
  // authoLogin: PropTypes.func,
  // auth: PropTypes.shape({}),
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
  getUserById,
})(ProfileUser);
