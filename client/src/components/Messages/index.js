import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

import {
  Spinner,
  Alert,
} from 'react-bootstrap';

import style from './style';

const Messages = ({
  warning,
  error,
  isFetching,
  classes,
}) => (
  <>
  {
    warning &&
    <div className={classes.center}>
      <Alert variant="primary">
      {warning}
      </Alert>
    </div>
  }
  {
    error &&
    <div className={classes.center}>
      <Alert variant="warning">
        {error.message || error}
      </Alert>
    </div>
  }
  { isFetching &&
    <div className={classes.center}>
      <Spinner animation="border" variant="primary" />
    </div>
  }
  </>
);

Messages.propType = {
  style: PropTypes.shape({}),
  warning: PropTypes.string,
  error: PropTypes.string,
  isFetching: PropTypes.bool,
};

export default injectSheet(style)(Messages)
