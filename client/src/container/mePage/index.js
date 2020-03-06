import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import injectSheet from 'react-jss';

import style from './style';
import Layout from '../layout';
import ProfileUser from '../../components/profileUser';


class MePage extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <Layout>
        <div className="me-page">
          <div className='me-page__container'>
            <ProfileUser />
            <div className="sitebar">
              <aside className="sitebar-links">
                <p className="sitebar-link"><Link to='/create-rate'><span>Создать ставку</span></Link></p>
                <p className="sitebar-link"><Link to='/create-rates-list'><span>Созданные ставки</span></Link></p>
                <p className="sitebar-link"><Link to='/rate-list'><span>Список ставок</span></Link></p>
              </aside>
            </div>
            <div className="content-user">
              content-user
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

MePage.propType = {
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

export default injectSheet(style)(
  connect(mapStateToProps, {
  })(MePage)
);
