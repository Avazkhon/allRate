import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import moment from 'moment-timezone';
import clsx from 'clsx';

import {
  Card,
  CardHeader,
  Avatar,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Collapse,

  IconButton,

  // Button,
  // TextField,
  // FormControl,
  // InputLabel,
  // Select,
  // List,
  // ListItem,
  // Grid,
  // Icon,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import CardPart from 'components/CardPart';

import {
} from 'actions'

// import {
//   rateStatusLive,
// } from '../../constants';


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

function RateCard (
  {
    selectRate,
  }
) {
  const classes = useStyles();

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // const isDisabledByLife = (rate.statusLife === rateStatusLive.finish) ||  (rate.statusLife === rateStatusLive.archive)

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <CardMedia
       className={classes.media}
       image={selectRate.data && selectRate.data.img}
       title="Main rate img"
     />
     <CardContent>
      <Typography variant="body2" color="textSecondary" component="p">
        {selectRate.data && selectRate.data.description}
      </Typography>
    </CardContent>
    <CardActions disableSpacing>
      <IconButton aria-label="Thumb down">
        <ThumbDownIcon />
      </IconButton>
      <IconButton aria-label="Thumb up">
        <ThumbUpIcon />
      </IconButton>
      <IconButton
      className={clsx(classes.expand, {
        [classes.expandOpen]: expanded,
      })}
      onClick={handleExpandClick}
      aria-expanded={expanded}
      aria-label="show more"
    >
      <ExpandMoreIcon />
    </IconButton>
    </CardActions>
    <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Part:</Typography>
          {selectRate.data &&
            selectRate.data.party.map((part) => {
              return (
                  <CardPart
                    part={part}
                    key={part._id}
                  />
              )
            })
          }
        </CardContent>
      </Collapse>
  </Card>
  )
}

RateCard.propTypes = {
  selectRate: PropTypes.shape(),
}

function mapStateToProps(state) {
  const {
    auth,
  } = state;
  return {
    auth,
  };
}

export default connect(
  mapStateToProps,
  {
  }
)(RateCard);
