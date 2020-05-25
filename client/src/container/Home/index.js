import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';

import {
  getAllNews,
} from 'actions';

import MyList from 'components/MyList';
import SiteBar from 'components/SiteBar';
import Layout from '../Layout';

import {
  getDataUserFromLocalStorag,
} from 'utils';

class Home extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    const {
      getAllNews,
    } = this.props;
    getAllNews();
  }

  render() {
    const {
      auth: {
        auth
      },
      myList,
    } = this.props;

    return (
      <Layout>
      <Container>
        <Row>
          <Col xs="12"  sm="4" md="3">
            <SiteBar
              userId={auth && auth.userId}
            />
          </Col>
          <Col xs="12" sm="8" md="9">
            <MyList
              myList={myList.data ? myList.data : []}
            />
          </Col>
        </Row>
      </Container>
      </Layout>
    );
  }
}

Home.propType = {
  getAllNews: PropTypes.func,
  auth: PropTypes.shape({}),
  myList: PropTypes.shape({}),
}

function mapStateToProps(state) {
  const {
    auth,
    myList,
  } = state;
  return {
    auth,
    myList,
  };
}

export default connect(mapStateToProps, {
  getAllNews,
})(Home);
