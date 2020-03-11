import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import queryString from 'query-string';

import SiteBar from 'components/SiteBar';

import style from './style';

class MakeRateComponent extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    const {
      classes,
      rate,
      auth,
    } = this.props;

    return (
      <div
        className={classes['make-rate']}
      >
        <div
          className={classes['make-rate__container']}
        >
          <SiteBar
            userId={auth.userId}
          />
          <content className={classes['content']}>
            make-rate rateId: {rate && rate._id}
          </content>
        </div>
      </div>
    );
  }
}

MakeRateComponent.propType = {
  rate: PropTypes.shape({}),
  classes: PropTypes.shape({}),
}

export default injectSheet({...style})(MakeRateComponent);
