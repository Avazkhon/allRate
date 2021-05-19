import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { CardPost } from 'components/CardPost';
import Layout from '../Layout';

import {
  addCountViewsPost,
  changeRatingPost,
  getPostById,
  getUsersByIds,
} from 'actions';

class CardPostPage extends React.Component {
  constructor(props) {
    super(props);

  }
  componentDidMount() {
    this.handleGetPostById()
    this.handleAddCountViewsPost()
  }

  handleAddCountViewsPost = () => {
    const {
      addCountViewsPost,
      match: { params: { id: postId } }
    } = this.props;
    addCountViewsPost(postId)
  }

  handleGetPostById = () => {
    const {
      match: { params: { id: postId } },
      getPostById,
      getUsersByIds
    } = this.props;
    getPostById(postId)
      .then((action) => {
        if (action.status === 'SUCCESS') {
          action.response && getUsersByIds([action.response?.author || action.response?.authorId]);
        }
      });
  }

  getAuthor = (users, itm) => users.find(user => user._id === itm.author || user._id === itm.authorId)

  handleChangeRating = (data, postId, action) => {
    const { changeRatingPost } = this.props;
    return changeRatingPost(data, postId, action)
      .then((action) => {
        this.handleGetPostById(postId)
        return action;
      })
  }

  render() {
    const {
      postPage,
      lang,
      users,
      auth: {
        auth
      }
    } = this.props;

    return (
      <Layout>
        { postPage.data?._id &&
          <CardPost
            changeRating={this.handleChangeRating}
            onAddCountViewsPost={this.handleAddCountViewsPost}
            post={postPage.data}
            isPage
            user={users.data && this.getAuthor(users.data, postPage.data)}
            lang={lang.lang}
            auth={auth}
          />
        }
      </Layout>
    );
  }
}

CardPostPage.propTypes = {
  lang: PropTypes.shape(),
  users: PropTypes.shape(),
  auth: PropTypes.shape(),
  postPage: PropTypes.shape(),
  history: PropTypes.shape(),
  match: PropTypes.shape(),
  changeRatingPost: PropTypes.func,
  getPostById: PropTypes.func,
  getUsersByIds: PropTypes.func,
  addCountViewsPost: PropTypes.func,
}

function mapStateToProps(state) {
  const {
    auth,
    postPage,
    lang,
    users,
  } = state;
  return {
    auth,
    postPage,
    lang,
    users: {
      data: users.data.docs,
    },
  };
}

export default connect(mapStateToProps, {
  changeRatingPost,
  getPostById,
  addCountViewsPost,
  getUsersByIds,
})(CardPostPage);
