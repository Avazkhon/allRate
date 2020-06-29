import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  Form,
  Button,
} from 'react-bootstrap';

import {
  addCountViewsPost,
  changeRatingPost,
  getUsersByIds,
  getPostsPage,
} from 'actions';

import Messages from 'components/Messages';
import CardPost from 'components/CardPost';
import NexLoadPage from 'widgets/NexLoadPage';

class CardsPosts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idOpenItm: null,
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      posts,
      getUsersByIds,
      getPostsPage
    } = this.props;
    if (
      (!prevProps.posts.data && posts.data && posts.data.docs)
    ) {
      getUsersByIds(posts.data.docs.map(itm => itm.author || itm.authorId));
    }
  }

  handleShow = (e) => {
    const { addCountViewsPost } = this.props;
    const { id, actionname } = e.currentTarget.dataset;
    this.setState({
      idOpenItm: id
    });
    addCountViewsPost(id);
  }

  handleHidden = (e) => {
    this.setState({
      idOpenItm: null
    });
  }

  getAuthor = (users, itm) => users.find(user => user._id === itm.author || user._id === itm.authorId)


  handleGetPostsPage = (page, limit) => {
    const { getPostsPage, userId } = this.props;
    getPostsPage({ page, limit, userId })
  }
  render() {
    const {
      idOpenItm,
    } = this.state;
    const {
      posts,
      lang: {
        lang,
      },
      changeRatingPost,
      users,
      history,
    } = this.props;

    return (
      <div>
      {
        posts.data && posts.data.docs.map((itm) => {
          return (
            <CardPost key={itm._id}
              changeRating={changeRatingPost}
              post={itm}
              handleShow={this.handleShow}
              handleHidden={this.handleHidden}
              isShow={idOpenItm === itm._id}
              user={users.data && this.getAuthor(users.data, itm)}
              lang={lang}
            />
          )
        })
      }

      <NexLoadPage
        isFetching={posts.isFetching}
        hasNextPage={posts.data && posts.data.hasNextPage}
        actionForLoad={this.handleGetPostsPage}
        history={history}
      />

      </div>
    );
  }
}

CardsPosts.propTypes = {
  posts: PropTypes.shape(),
  users: PropTypes.shape(),
  history: PropTypes.shape(),
  addCountViewsPost: PropTypes.func,
  changeRatingPost: PropTypes.func,
  getPostsPage: PropTypes.func,
  userId: PropTypes.string,
}

function mapStateToProps(state) {
  const {
    lang,
    users
  } = state;
  return {
    lang,
    users: {
      data: users.data.docs,
    }
  };
}

export default connect(mapStateToProps, {
  addCountViewsPost,
  changeRatingPost,
  getUsersByIds,
  getPostsPage,
})(CardsPosts);
