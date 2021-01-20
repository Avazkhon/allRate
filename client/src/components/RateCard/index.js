import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
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
  Link,

} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import CardPart from 'components/CardPart';
import Rating from 'widgets/Rating';

import {
  getUsersByIds,
  changeRatingRate,
  getUserForPageById
} from 'actions';

import {
  formatDateTime,
} from '../../constants';


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    margin: 5,
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
    auth,
    getUsersByIds,
    changeRatingRate,
    getUserForPageById
  }
) {
  const classes = useStyles();

  const [expanded, setExpanded] = useState(false);
  const [author, changeAuthor] = useState({});

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    selectRate.data && selectRate.data.authorId && getUsersByIds([selectRate.data.authorId])
      .then((action) => {
        if (action.status === 'SUCCESS') {
          changeAuthor(action.response[0])
        }
      })
  }, selectRate.data)


  function handleChangeRatingRate(data, objectId, action) {
    return changeRatingRate(data, objectId, action)
  }

  return (
    <Card>
      <CardHeader
        avatar={
          <Link
            href={auth.auth && auth.auth.userId === author._id ? '/me' : `/profile/${author._id}`}
            >
            <Avatar
              aria-label="recipe"
              src={'/media/image/' + author.avatar}
              alt={author.userName}
              className={classes.avatar}
            />
          </Link>
        }
        title={author.userName}
        subheader={selectRate.data && moment(selectRate.data.createDate).format(formatDateTime)}
      />
      <CardMedia
       className={classes.media}
       image={selectRate.data && '/media/image/' + selectRate.data.img}
       title="Main rate img"
     />
     <CardContent>
      <Typography variant="body2" color="textSecondary" component="p">
        {selectRate.data && selectRate.data.description}
      </Typography>
      <Typography variant="body2" color="textSecondary" component="p">
        Дата начало: {selectRate.data && moment(selectRate.data.dateStart).format(formatDateTime)}
      </Typography>
      <Typography variant="body2" color="textSecondary" component="p">
        Дата завершения: {selectRate.data && moment(selectRate.data.dateFinish).format(formatDateTime)}
      </Typography>
      {
        selectRate.data &&
        <Rating
          changeRating={handleChangeRatingRate}
          rating={selectRate.data.rating}
          objectId={selectRate.data._id}
          isShow
        />
      }
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
  auth: PropTypes.shape(),
  getUsersByIds: PropTypes.func,
  changeRatingRate: PropTypes.func,
  getUserForPageById: PropTypes.func,
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
    getUsersByIds,
    changeRatingRate,
    getUserForPageById
  }
)(RateCard);
