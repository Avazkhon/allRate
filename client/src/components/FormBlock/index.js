import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';

import {
  Form,
} from 'react-bootstrap';

import style from './style';

// import {
// } from 'actions';

// import {
// } from 'utils';

// import Messages from 'components/Messages';

class FormBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {

    const {
      classes,
    } = this.props;

    return (
      <Form className={classes['card-block']}>
        FormBlock
      </Form>
    );
  }
}

FormBlock.propTypes = {
  auth: PropTypes.shape(),
  classes: PropTypes.shape(),
}

function mapStateToProps(state) {
  const {
    auth,
  } = state;
  return {
    auth,
  };
}

export default injectSheet(style)(
  connect(mapStateToProps, {

  })(FormBlock)
)
