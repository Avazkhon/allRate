import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import injectSheet from 'react-jss';

import style from './style';
import Layout from '../layout';
import ProfileUser from '../../components/profileUser';


class MePage extends React.Component {
  // constructor(props) {
  //   super(props);
  //
  // }

  render() {
    const {
      classes,
    } = this.props;
    return (
      <Layout>
        <div className={classes['me-page']}>
          <div className={classes['me-page__container']}>
            <ProfileUser />
            <div className={classes['sitebar']}>
              <aside className={classes['sitebar-links']}>
                <p className={classes['sitebar-link']}><Link to='/create-rate'><span>Создать ставку</span></Link></p>
                <p className={classes['sitebar-link']}><Link to='/create-rates-list'><span>Созданные ставки</span></Link></p>
                <p className={classes['sitebar-link']}><Link to='/rate-list'><span>Список ставок</span></Link></p>
              </aside>
            </div>
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

export default injectSheet(style)(
  connect(mapStateToProps, {
  })(MePage)
);
