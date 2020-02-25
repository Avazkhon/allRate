import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { Link } from "react-router-dom";

import Layout from '../layout';

import './style.css';

class RateList extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <Layout>
        <div className="rate-list">
          RateList
        </div>
      </Layout>
    );
  }
}

RateList.propType = {
  // authRegistration: PropTypes.func,
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
})(RateList);
