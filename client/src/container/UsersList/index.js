import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  getSubscriptions,
} from 'actions';

import CardUsers from 'components/CardUsers';
import Layout from '../Layout';

import {
  getDataUserFromLocalStorag,
} from 'utils';

class UsersList extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    const {
      getSubscriptions,
    } = this.props;
    const user = getDataUserFromLocalStorag();
    if (user && user.userId) {
      getSubscriptions(user.userId);
    }
  }

  render() {
    const {
      history,
    } = this.props;

    return (
      <Layout>
        <CardUsers
          history={history}
        />
      </Layout>
    );
  }
}

UsersList.propTypes = {
  getSubscriptions: PropTypes.func,
  users: PropTypes.shape(),
  auth: PropTypes.shape(),
  history: PropTypes.shape(),
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
  getSubscriptions,
})(UsersList);
