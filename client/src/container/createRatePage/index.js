import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import Layout from '../layout';

import CreateNewRate from './components/CreateNewRate';

import {
  creteNewRate,
} from '../../actions'

import './style.css';

class CreateRatePAge extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //   }
  // }

  // componentDidMount() {
  // }


  render() {
    const {
      creteNewRate,
    } = this.props;
    return (
      <Layout>
        <div className="create-rate">
          <CreateNewRate
            creteNewRate={creteNewRate}
          />
        </div>
      </Layout>
    );
  }
}

CreateRatePAge.propType = {
  creteNewRate: PropTypes.func,
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
  creteNewRate,
})(CreateRatePAge);
