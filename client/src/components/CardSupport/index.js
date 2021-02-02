import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import moment from 'moment-timezone';
import { Link } from "react-router-dom";


import {
  formatDateTime,
} from '../../constants';


const useStyles = makeStyles({
  root: {
    minWidth: 275,
    border: '0.5px solid gray',
    marginTop: '10px',
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

  return (
    <>
      {
        isList ?
          (
            <Link to={`/admin/support/?supportId=${support._id}`}>
              <Card className={classes.root}>
                <CardContent>
                  <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {support.subject}
                  </Typography>
                  <Typography variant="h5" component="h2">
                    {support.text}
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    Статус: {support.status}
                  </Typography>
                  <Typography>
                    {moment(support.createDate).format(formatDateTime)}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          )
        :
          (
            <Card className={classes.root}>
              <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  {support.subject}
                </Typography>
                <Typography variant="h5" component="h2">
                  {support.text}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  Статус: {support.status}
                </Typography>
                <Typography>
                  {moment(support.createDate).format(formatDateTime)}
                </Typography>
              </CardContent>
            </Card>
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
