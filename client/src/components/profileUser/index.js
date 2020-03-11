import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';

import style from './style';

import {
  getUserById,
} from '../../actions'

class ProfileUser extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    const { getUserById } = this.props;
    let { auth } = this.props;
    auth = auth && auth.auth || null;
    if (auth && auth.userId) {
      getUserById('user/?id='+auth.userId)
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { getUserById } = prevProps;
    let { auth } = prevProps;
    let { auth: userId } = this.props;

    userId = userId && userId.auth && userId.auth.userId
    auth = auth && auth.auth || null;
    if (
      (auth && userId
      && userId
      && auth.userId !== userId)
      || (!auth && userId)
    ) {
      getUserById('user/?id='+userId);
    }
  }

  render() {
    const {
      auth: { userData },
      classes
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
      <div className={classes['profile-user']}>
        <div className={classes['profile-user__container']}>
          <div className={classes.avatar}>
            <img src="#" alt="Avatar" />
          </div>
          <div className={classes['profile-user_edit']}>
            <div className={classes['profile-user-edit']}>
              <input
                type="button"
                value="Редактировать"
              />
            </div>
          </div>
          <div className={classes['profile-user__content']}>
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
  auth: PropTypes.shape({}),
  classes: PropTypes.shape({}),
}

function mapStateToProps(state) {
  const {
    auth,
  } = state;
  return {
    auth,
  };
}

export default injectSheet(style)(
  connect(mapStateToProps, {
    getUserById,
  })(ProfileUser)
);
