import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";


import {
  Container,
  Row,
  Col,
  Carousel,
} from 'react-bootstrap';

import {
  getPostsPage,
  getRatesPage,
} from 'actions';

import SiteBar from 'components/SiteBar';
import Layout from '../Layout';


class Home extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    const {
      getPostsPage,
      getRatesPage,
    } = this.props;
    getPostsPage({ page: 1, limit: 6 });
    getRatesPage({ page: 1, limit: 6, statusLife: ['active', 'new'] });
  }

  render() {
    const {
      auth: {
        auth
      },
      posts,
      rate,
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
            <Carousel>
              {
                rate.data && rate.data.docs && rate.data.docs.map((itm) => {
                  return (
                    <Carousel.Item key={itm._id}>
                      <img
                        className="d-block w-100"
                        src={itm.img}
                        alt={itm.title}
                      />

                      <Carousel.Caption>
                        <Link to={`/make-rate?rateId=${itm._id}`}><h3>{itm.title}</h3></Link>
                        <p>{itm.description}</p>
                      </Carousel.Caption>
                    </Carousel.Item>
                  )
                })
              }
            </Carousel>
          </Col>
        </Row>
      </Container>
      </Layout>
    );
  }
}

Home.propTypes = {
  getRatesPage: PropTypes.func,
  getPostsPage: PropTypes.func,
  auth: PropTypes.shape(),
  posts: PropTypes.shape(),
  rate: PropTypes.shape(),
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
    rate,
  };
}

export default connect(mapStateToProps, {
  getPostsPage,
  getRatesPage,
})(Home);
