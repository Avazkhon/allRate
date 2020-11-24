import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';

import SiteBar from 'components/SiteBar';
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
        <Row>
          <Col xs="12"  sm="4" md="3">
            <SiteBar
              userData={userData}
            />
          </Col>
          <Col xs="12" sm="8" md="9">
            <CardsPosts
              posts={posts}
              history={history}
            />
          </Col>
        </Row>
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
