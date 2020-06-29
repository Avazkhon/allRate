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
      getPostsPage,
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
      </div>
    );
  }
}

CardsPosts.propTypes = {
  posts: PropTypes.shape({}),
  users: PropTypes.shape({}),
  addCountViewsPost: PropTypes.func,
  changeRatingPost: PropTypes.func,
  getPostsPage: PropTypes.func,
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
