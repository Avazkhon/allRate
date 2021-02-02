import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import moment from 'moment-timezone';
import { Link } from "react-router-dom";


import {
  formatDateTime,
} from '../../constants';


const useStyles = makeStyles({
  root: {
    border: '0.5px solid gray',
    marginTop: '10px',
    wordWrap: 'break-word',
    maxWidth: '350px',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function CardSupport({ support, isList }) {
  const classes = useStyles();


  function renderCard() {
    return (
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            {support.subject}
          </Typography>
          <Typography variant="body1" component="h2">
            {support.text}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            Статус: {support.status}
          </Typography>
          {
            support.email &&
            <Typography className={classes.pos} color="textSecondary">
              email: {support.email}
            </Typography>
          }
          {
            support.userId &&
            <Link to={`/profile/${support.userId}`}>
              <Typography className={classes.pos} color="textSecondary">
                Пользователь: {support.userId}
              </Typography>
            </Link>
          }
          <Typography>
            {moment(support.createDate).format(formatDateTime)}
          </Typography>
        </CardContent>
      </Card>
    )
  }
  return (
    <>
      {
        isList ?
          (
            <Link to={`/admin/support/?supportId=${support._id}`}>
              {renderCard()}
            </Link>
          )
        :
          (
            renderCard()
          )
      }
    </>
  );
}

CardSupport.propTypes = {
  support: PropTypes.shape(),
  isList: PropTypes.bool,
}

export default CardSupport
