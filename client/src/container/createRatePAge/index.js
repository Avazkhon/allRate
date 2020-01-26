import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import Layout from '../layout';

// import {
//   authRegistration,
//   authoLogin,
//   createNewUser,
// } from '../../actions'

import './style.css';

class CreateRatePAge extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  // componentDidMount() {
  // }


  render() {
    return (
      <Layout>
        <div className="create-rate">
          CreateRatePAge
        </div>
      </Layout>
    );
  }
}

CreateRatePAge.propType = {
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
})(CreateRatePAge);
