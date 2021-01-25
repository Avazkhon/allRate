import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';


import CardsPosts from 'components/CardsPosts';
import Layout from '../Layout';

class PostList extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    const {
      auth: {
        userData,
      },
      posts,
      history,
    } = this.props;

    return (
      <Layout>
      <Container>
        <CardsPosts
          posts={posts}
          history={history}
        />
      </Container>
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
