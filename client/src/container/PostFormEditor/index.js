import React from 'react';
import { connect } from 'react-redux';
import Layout from 'container/Layout';

import PostForm from 'components/PostForm';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 24,
  },
  title: {
    fontSize: 24,
  },
  formPost: {
    marginTop: 24
  }

}));

function PostFormEditor (props) {
  const {
    match: { params: { id: postId } }
  } = props;
  const classes = useStyles();

  return (
    <Layout>
      <div className={classes.root}>
        <Typography className={classes.title} variant="h1" component="p">
          Страница редактирования поста
        </Typography>
        <div className={classes.formPost}>
          <PostForm postId={postId}/>
        </div>
      </div>
    </Layout>
  );
}


function mapStateToProps(state) {
  const {
    auth,
    posts,
    rate,
  } = state;
  return {
    auth,
    posts,
    rates: rate
  };
}

export default connect(mapStateToProps, {})(PostFormEditor)
