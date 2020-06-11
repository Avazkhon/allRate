import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


import {
  Container,
  Row,
  Col,
  Carousel,
} from 'react-bootstrap';

import {
  getAllNews,
  getPostsPage,
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
      getPostsPage,
    } = this.props;
    getPostsPage({ page: 1, limit: 6 })
    getAllNews();
  }

  render() {
    const {
      auth: {
        auth
      },
      myList,
      posts,
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
            <Carousel>
              {
                posts.data && posts.data.docs && posts.data.docs.map((itm) => {
                  return (
                    <Carousel.Item key={itm._id}>
                      <img
                        className="d-block w-100"
                        src={itm.img.url}
                        alt={itm.title}
                      />

                      <Carousel.Caption>
                        <h3>{itm.title}</h3>
                        <p>{itm.text}</p>
                      </Carousel.Caption>
                    </Carousel.Item>
                  )
                })
              }
            </Carousel>
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

Home.propType = {
  getAllNews: PropTypes.func,
  auth: PropTypes.shape({}),
  myList: PropTypes.shape({}),
  posts: PropTypes.shape({}),
}

function mapStateToProps(state) {
  const {
    auth,
    myList,
    posts,
  } = state;
  return {
    auth,
    myList,
    posts,
  };
}

export default connect(mapStateToProps, {
  getAllNews,
  getPostsPage,
})(Home);
