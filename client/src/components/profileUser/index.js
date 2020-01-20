import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './style.css';

class ProfileUser extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
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
          </div>
        </div>
      </div>
    );
  }
}

ProfileUser.propType = {
  // authRegistration: PropTypes.func,
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
})(ProfileUser);
