import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  addCountViewsPost,
  changeRatingPost,
  getUsersByIds,
  getPostsPage,
} from 'actions';

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
    } = this.props;
    if (
      (!prevProps.posts.data && posts.data && posts.data.docs.length)
    ) {
      getUsersByIds(posts.data.docs.map(itm => itm.author || itm.authorId));
    }
  }

  handleShow = (e) => {
    const { addCountViewsPost } = this.props;
    const { id } = e.currentTarget.dataset;
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
      getPostsPage,
    } = this.props;
    console.log(posts);
    return (
      <>
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
          actionForLoad={getPostsPage}
          history={history}
        />
      </>
    );
  }
}

CardsPosts.propTypes = {
  posts: PropTypes.shape({}),
  users: PropTypes.shape(),
  history: PropTypes.shape(),
  addCountViewsPost: PropTypes.func,
  getPostsPage: PropTypes.func,
  changeRatingPost: PropTypes.func,
  isRateList: PropTypes.bool,
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
