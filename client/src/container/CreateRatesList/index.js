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
    const { rate: { ratesData } } = this.props;
    console.log(ratesData);
    return (
      <Layout>
        <div>
          <div>Список вами созданных ставок</div>
          <ul>
            {
              ratesData && ratesData.map((rate) => (
                <li key={rate._id}>
                  <div>{rate.title}</div>
                  <div>{rate.descriptions}</div>
                  <div>{rate.localTime}</div>
                </li>
              ))
            }
          </ul>
        </div>
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
