import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './style.css';
import Layout from '../layout';

import {
  getRates,
} from '../../actions';


class MePage extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    const { auth, rate, getRates} = this.props;
    getRates(auth && auth.auth && auth.auth.userId);
  }

  render() {
    return (
      <Layout>
      </Layout>
    );
  }
}

MePage.propType = {
  // authRegistration: PropTypes.func,
}

function mapStateToProps(state) {
  const {
    auth,
    rate,
  } = state;
  return {
    auth,
    rate,
  };
}

export default connect(mapStateToProps, {
  getRates,
})(MePage);
