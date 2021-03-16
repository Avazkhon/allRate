import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import {
  ListGroup,
  Spinner,
} from 'react-bootstrap';

import {
  getPurse,
} from 'actions';

const useStyles = makeStyles((theme) => ({
  label:{
    width: '20%',
  },
  span: {
    width: '80%',
    verticalAlign: 'bottom',
    textOverflow: 'ellipsis',
    /* white-space: nowrap; */
    overflow: 'hidden',
    display: 'inline-block',
  }
}));

function PurseWidget ({
  purse: {
    purse,
  },
  getPurse,
  auth,
  idPurse,
}) {
  const classes = useStyles();

  useEffect(() => {
    if (
      auth.auth && !purse
    ) {
      getPurse();
    }
  })

  return (
    <ListGroup>
      <ListGroup.Item>
        <Link to="/purse">кошелек: </Link>
        {
          !purse &&
          <Spinner animation="grow" size="sm" />
        }
        { purse && purse.amount } { purse && purse.currency === 'RUB' ? 'руб.' : ''}
      </ListGroup.Item>
      {
        purse && idPurse &&
        <ListGroup.Item>
          <strong className={classes.label}>id: </strong>
          <span className={classes.span}>{purse._id}</span>
        </ListGroup.Item>
      }
    </ListGroup>
  )
}

PurseWidget.propTypes = {
  auth: PropTypes.shape(),
  purse: PropTypes.shape(),
  idPurse: PropTypes.bool,
  getPurse: PropTypes.func,
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
