import React from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/ru';
import { Helmet } from "react-helmet";

import { makeStyles } from '@material-ui/core/styles';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CommentIcon from '@material-ui/icons/Comment';
import EditIcon from '@material-ui/icons/Edit';

import Rating from 'widgets/Rating';

import {
  CreateContentPost
} from './CreateContentPost';

import Comments from '../Comments'

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 345,
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
  link: {
    '&:hover': {
      textDecoration: 'none'
    }
  },
  content: {
    '& img': {
      width: '100%'
    }
  },
  sibCardActions: {
    height: 22
  }
}));

const cardPostText = {
  show: { RU: 'Просмотреть', EN: 'show' },
  goTo: { RU: 'Перейти', EN: 'Go to' },
  hidden: { RU: 'Скрыть', EN: 'Hidden' },
  views: { RU: 'Просмотры', EN: 'Views' },
  edit: { RU: 'Редактровать', EN: 'Edit' }
};

export const CardPost = (props) => {
  const {
    post: {
      title,
      text,
      _id,
      img,
      views,
      rating,
      createDate,
      commentsId,
      commentsCount
    },
    changeRating,
    onAddCountViewsPost,
    lang,
    user,
    auth,
    isPage,
  } = props;


  moment.locale(lang);

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(isPage);

  const handleExpandClick = () => {
    setExpanded(() => {
      if (!expanded) {
        onAddCountViewsPost()
      }
      return !expanded
    });
  };

  const mainImage = `/media/image/${img.url}`;
  const itAuthor = (user && auth) && (user._id === auth.userId)
  return (
    <>
      {
        isPage && (
          <Helmet>
            {
              title && (
                <title>{title}</title>
              )
            }
          </Helmet>
        )
      }
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar
              aria-label="recipe"
              className={classes.avatar}
              src={(user && '/media/image/' + user.avatar) || '#'}
            >
              {user && user.userName[0]}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              {
                itAuthor ? (
                  <Link
                    to={`/post-form/${_id}`}
                    className={classes.link}
                  >
                    <Typography variant="body2" color="textSecondary" component="p">
                      <EditIcon
                        fontSize="small"
                        titleAccess={ cardPostText.edit[lang] }
                      />
                    </Typography>
                  </Link>
                ) : null
              }
            </IconButton>
          }
          title={
            <Link
              to={(
                user && (
                  itAuthor ?`/me/` : `/profile/${user._id}`)
              ) || '#'}
              className={classes.link}
            >
              { user && user.userName }
            </Link>
          }
          subheader={moment(createDate).fromNow()}
        />
        <CardMedia
          className={classes.media}
          image={mainImage}
          title={title}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            { title }
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          {
            !isPage && (
              <IconButton aria-label="Got ot page post">
                <Link
                  to={`/post/${_id}`}
                  className={classes.link}
                >
                  <Typography variant="body2" color="primary" component="p">
                    {cardPostText.goTo[lang]}
                  </Typography>
                </Link>
              </IconButton>
            )
          }
          <IconButton aria-label="Count views">
            <VisibilityIcon fontSize="small" title={cardPostText.views[lang]}/> {views}
          </IconButton>
          <IconButton aria-label="Count comments">
            <CommentIcon fontSize="small" /> {commentsCount}
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
        <CardActions className={classes.sibCardActions} disableSpacing>
          {
            expanded && (
              <IconButton aria-label="Make reiting">
                <Rating
                  changeRating={changeRating}
                  rating={rating}
                  objectId={_id}
                  isShow={expanded || isPage}
                />
              </IconButton>
            )
          }
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <CreateContentPost
              text={text}
              classes={classes}
            />
          </CardContent>
          {
            isPage && (
              <Comments
                commentsId={commentsId}
              />
            )
          }
        </Collapse>
      </Card>
    </>
  );
}
