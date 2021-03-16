import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import queryString from 'query-string';
import injectSheet from 'react-jss';

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

import style from './style';

class CardsPosts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idOpenItm: null,
    }
  }

  componentDidMount() {
    this.handleChangePagination()
  }

  handleChangePagination = (increment) => {
    const incrementPage = increment ? increment : 0;
    const { getPostsPage, history, userId, getUsersByIds } = this.props;
    const { page = 1, limit = 24 } = queryString.parse(location.search);
    const { content: hash } = queryString.parse(history.location.hash);
    const nexQueryParams = queryString.stringify({page: Number(page) + incrementPage, limit});
    let userParams = { authorId: userId || this.userId };
    if (hash === 'subscribtion_posts') {
      userParams = { subscriptionsId: userId || this.userId}
    }

    getPostsPage({page: Number(page) + incrementPage, limit, ...userParams})
      .then((action) => {
        if (action.status === 'SUCCESS' && action.response.docs.length) {
          getUsersByIds(action.response.docs.map(itm => itm.author || itm.authorId));
        }
      });
    history.push({
      search: nexQueryParams,
      hash: history.location.hash
    });
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


  handleGetPostsPage = () => {
    this.handleChangePagination(1);
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
      auth: {
        auth
      },
      classes,
    } = this.props;
    return (
      <section className={classes['posts-list']}>
        <h1>Статьи</h1>
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
                auth={auth}
              />
            )
          })
        }
        {
          posts.data && posts.data.hasNextPage &&
          <Button className="d-block mx-auto" onClick={this.handleGetPostsPage}>Загрузить</Button>
        }
      </section>
    );
  }
}

CardsPosts.propTypes = {
  posts: PropTypes.shape(),
  users: PropTypes.shape(),
  history: PropTypes.shape(),
  classes: PropTypes.shape(),
  addCountViewsPost: PropTypes.func,
  changeRatingPost: PropTypes.func,
  getPostsPage: PropTypes.func,
  userId: PropTypes.string,
}

function mapStateToProps(state) {
  const {
    lang,
    users,
    auth,
  } = state;
  return {
    lang,
    auth,
    users: {
      data: users.data.docs,
    }
  };
}

export default injectSheet(style)
(
  connect(mapStateToProps, {
    addCountViewsPost,
    changeRatingPost,
    getUsersByIds,
    getPostsPage,
  })(CardsPosts)
)
