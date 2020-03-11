import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import classNames from 'classnames';
import queryString from 'query-string';


import style from './style';

class MakeRateComponent extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    const {
      classes,
      rate
    } = this.props;


    return (
      <div
        className={classNames(classes['make-rate'])}
      >
        make-rate rateId: {rate && rate._id}
      </div>
    );
  }
}

MakeRateComponent.propType = {
  rate: PropTypes.shape({}),
  classes: PropTypes.shape({}),
}

export default injectSheet({...style})(MakeRateComponent);
