import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';

// import {
//   getSubscriptions,
// } from 'actions';

import SiteBar from 'components/SiteBar';
import CardsPosts from 'components/CardsPosts';
import Layout from '../Layout';

// import {
//   getDataUserFromLocalStorag,
// } from 'utils';

class PostList extends React.Component {
  constructor(props) {
    super(props);

  }

  // componentDidMount() {
  //   const {
  //     getSubscriptions,
  //   } = this.props;
  //   const user = getDataUserFromLocalStorag();
  //   if (user && user.userId) {
  //     getSubscriptions(user.userId);
  //   }
  // }

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
  // getSubscriptions: PropTypes.func,
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

export default connect(mapStateToProps, {
  // getSubscriptions,
})(PostList);
