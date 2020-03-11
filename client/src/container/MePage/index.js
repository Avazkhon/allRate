import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import injectSheet from 'react-jss';

import Layout from 'container/Layout';
import ProfileUser from 'components/profileUser';
import SiteBar from 'components/SiteBar';

import style from './style';


class MePage extends React.Component {
  // constructor(props) {
  //   super(props);
  //
  // }

  render() {
    const {
      classes,
      auth,
    } = this.props;
    const userId = auth.auth && auth.auth.userId;
    return (
      <Layout>
        <div className={classes['me-page']}>
          <div className={classes['me-page__container']}>
            <ProfileUser />
            <SiteBar
              userId={userId}
            />
            <div className={classes['content-user']}>
              content-user
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

MePage.propType = {
  classes: PropTypes.shape({}),
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

export default injectSheet(style)(
  connect(mapStateToProps, {
  })(MePage)
);
