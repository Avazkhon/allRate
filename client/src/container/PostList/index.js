import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from "react-helmet";


import CardsPosts from 'components/CardsPosts';
import Layout from '../Layout';

class PostList extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    const {
      posts,
      history,
    } = this.props;

    return (
      <Layout>
        <Helmet>
          <title>Страница постов Face Betting</title>
          <meta name="description" content="Читайте лучшие статьи наших блогеров Face Betting про спорт, киберспорт, политику и шоу. Тут много статей про пари, ставки и про то как заработать деньги в интерене с помощью Face Betting"/>
        </Helmet>
        <CardsPosts
          posts={posts}
          history={history}
        />
      </Layout>
    );
  }
}

PostList.propTypes = {
  users: PropTypes.shape(),
  auth: PropTypes.shape(),
  history: PropTypes.shape(),
  posts: PropTypes.shape(),
}

function mapStateToProps(state) {
  const {
    auth,
    posts,
  } = state;
  return {
    auth,
    posts,
  };
}

export default connect(mapStateToProps, {})(PostList);
