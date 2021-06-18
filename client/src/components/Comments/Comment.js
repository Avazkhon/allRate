import React from 'react';
import moment from 'moment';
import 'moment/locale/ru';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: 16
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
  cardContent: {
    padding: '0 24px 8px 24px'
  },
  link: {
    '&:hover': {
      textDecoration: 'none'
    }
  },
}));

export const Comment = (props) => {
  const {
    comment,
    auth
  } = props
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="recipe"
            className={classes.avatar}
            alt={comment.avatar}
            src={'/media/image/' + comment.avatar}
          >
            {comment.userName[0]}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <Link
            to={(auth?.userId === comment.authorId ?`/me/` : `/profile/${comment.authorId}`)}
            className={classes.link}
          >
            { comment.userName }
          </Link>
        }
        subheader={moment(comment.createDate).fromNow()}
      />
      <CardContent className={classes.cardContent}>
        <Typography variant="body2" color="textSecondary" component="p">
          { comment.text }
        </Typography>
      </CardContent>
      {
        // <CardActions disableSpacing>
        //   <IconButton aria-label="add to favorites">
        //     <FavoriteIcon />
        //   </IconButton>
        //   <IconButton aria-label="share">
        //     <ShareIcon />
        //   </IconButton>
        // </CardActions>
      }
    </Card>
  );
}

