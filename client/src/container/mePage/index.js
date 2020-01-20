import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Layout from '../layout';

import './style.css';

class Mepage extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <Layout>
        <div className="me-page">
          <div className='me-page__container'>
            <div className="profile-user">
              profile-user
            </div>
            <div className="sitebar">
              sitebar
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

Mepage.propType = {
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
})(Mepage);
