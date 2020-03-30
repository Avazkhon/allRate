import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  ListGroup,
} from 'react-bootstrap';

import {
  getPurse,
} from 'actions';

class PurseWidget extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidUpdate(prevProps) {
    const { getPurse, purse, auth } = this.props;
    if (
      auth.auth && !prevProps.purse.isFetching
      && !prevProps.purse.error && !prevProps.purse.purse
    ) {
      getPurse();
    };
  }

  render() {
    const {
      purse: {
        purse,
      },
    } = this.props;

    return (
      <ListGroup>
        <ListGroup.Item>
          <Link to="/purse">
            кошелек: { purse && purse.amount } { purse && purse.currency === 'RUB' ? 'руб.' : ''}
          </Link>
        </ListGroup.Item>
      </ListGroup>
    );
  }
};

PurseWidget.propType = {
  auth: PropTypes.shape({}),
};

function mapStateToProps (state) {
  const {
    auth,
    purse,
  } = state;
  return {
    auth,
    purse,
  };
}
export default connect(
  mapStateToProps,
  {
    getPurse,
  }
)(PurseWidget);
