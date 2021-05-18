import React from 'react';
import { connect } from 'react-redux';

import { Container } from 'react-bootstrap';

import Layout from 'container/Layout';
import PostForm from 'components/PostForm';

function PostFormEditor (props) {
  const {
    match: { params: { id: postId } }
  } = props;
  return (
    <Layout>
      <Container>
        <PostForm postId={postId}/>
      </Container>
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
