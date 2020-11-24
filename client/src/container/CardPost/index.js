import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';

import SiteBar from 'components/SiteBar';
import CardPost from 'components/CardPost';
import Layout from '../Layout';
import queryString from 'query-string';

import {
  addCountViewsPost,
  changeRatingPost,
  getPostById,
  getUsersByIds,
  // getPostsPage,
} from 'actions';

class CardPostPage extends React.Component {
  constructor(props) {
    super(props);

  }
  componentDidMount() {
    const {
      getPostById,
      addCountViewsPost,
      getUsersByIds,
      match: { params: { id: postId } }
    } = this.props;
    getPostById(postId)
      .then((action) => {
        if (action.status === 'SUCCESS') {
          getUsersByIds([action.response.author || action.response.authorId]);
        }
      });
    addCountViewsPost(postId)
  }

  getAuthor = (users, itm) => users.find(user => user._id === itm.author || user._id === itm.authorId)

  render() {
    const {
      auth: {
        userData,
      },
      postPage,
      changeRatingPost,
      lang,
      users,
    } = this.props;

    return (
      <Layout>
      <Container>
        <Row>
          <Col xs="12"  sm="4" md="3">
            <SiteBar
              userData={userData}
            />
          </Col>
            <Col xs="12" sm="8" md="9">
            { postPage.data._id &&
              <CardPost
                changeRating={changeRatingPost}
                post={postPage.data}
                // handleShow={this.handleShow}
                // handleHidden={this.handleHidden}
                isPage
                user={users.data && this.getAuthor(users.data, postPage.data)}
                lang={lang}
              />
            }
            </Col>
        </Row>
      </Container>
      </Layout>
    );
  }
}

CardPostPage.propTypes = {
  lang: PropTypes.string,
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
