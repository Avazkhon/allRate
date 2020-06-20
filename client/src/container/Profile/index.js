import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';

import {
  getMyList,
} from 'actions';

import Layout from 'container/Layout';
import ProfileUser from 'components/ProfileUser';
import SiteBar from 'components/SiteBar';
import MyList from 'components/MyList';

class Profile extends React.Component {
  // constructor(props) {
  //   super(props);
  //
  // }

  componentDidMount() {
    const { getMyList, match: { params: { id } } } = this.props;
    getMyList(id)
  }

  render() {
    const {
      auth,
      myList,
    } = this.props;
    const userId = auth.auth && auth.auth.userId;
    const { match: { params: { id } } } = this.props;
    return (
      <Layout>
        <Container>
          <Row>
            <Col xs="12"  sm="4" md="3">
              <SiteBar
                userId={userId}
              />
            </Col>
            <Col xs="12" sm="8" md="9">
              <ProfileUser
                profileId={id}
              />
              <MyList
                myList={myList}
              />
            </Col>
          </Row>
        </Container>
      </Layout>
    );
  }
}

Profile.propTypes = {
  auth: PropTypes.shape(),
  match: PropTypes.shape(),
  myList: PropTypes.shape(),
  getMyList: PropTypes.func,
}

function mapStateToProps(state) {
  const {
    auth,
    myList,
  } = state;
  return {
    auth,
    myList
  };
}

export default connect(mapStateToProps, {
  getMyList,
})(Profile);
