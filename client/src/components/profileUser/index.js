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
    const { getUserById, auth, auth: { data } } = this.props;
    if (data && data.userId) {
      getUserById('user/?id='+data.userId)
    }
  }

  componentWillReceiveProps(nexState) {
    const { getUserById, auth, auth: { data }, userData } = nexState;
      if (data && data.userId && !userData.data) {
        getUserById('user/?id='+data.userId);
      }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { getUserById, auth, auth: { data }, userData } = prevProps;
    if (data && this.props.auth.data &&  data.userId !== this.props.auth.data.userId) {
      getUserById('user/?id='+data.userId);
    }
  }

  render() {
    const {
      userData: { data },
    } = this.props;
    let userProps = [];
    if (data && data._id) {
      userProps = [
        { name: data.email },
        { name: data.userName },
        { name: data.phone },
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
    userData
  } = state;
  return {
    auth,
    userData,
  };
}

export default connect(mapStateToProps, {
  getUserById,
})(ProfileUser);
