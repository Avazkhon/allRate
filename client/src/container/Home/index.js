import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import injectSheet from 'react-jss';


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

import style from './style';

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
      posts,
      rate,
      classes,
    } = this.props;

    return (
      <Layout>
      <Container>
        <Row>
          <Col xs="12" sm="8" md="9">
            {
              posts.data && posts.data.docs && !!posts.data.docs.length &&
              <Carousel className={classes.carousel}>
                {
                  posts.data.docs.map((itm) => {
                    return (
                      <Carousel.Item key={itm._id}>
                        <Link to={`/post/${itm._id}`}>
                          <img
                            style={{filter: 'brightness(50%)'}}
                            className="d-block w-100"
                            src={'/media/image/' + itm.img.url + '?resize=600x400'}
                            alt={itm.title}
                          />

                          <Carousel.Caption>
                            <h3>{itm.title}</h3>
                          </Carousel.Caption>
                        </Link>
                      </Carousel.Item>
                    )
                  })
                }
              </Carousel>
            }
            {
              rate.data && rate.data.docs && !!rate.data.docs.length &&
              <Carousel className={classes.carousel}>
                {
                  rate.data.docs.map((itm) => {
                    return (
                      <Carousel.Item key={itm._id}>
                        <Link to={`/make-rate?rateId=${itm._id}`}>
                          <img
                            style={{filter: 'brightness(50%)'}}
                            className="d-block w-100"
                            src={'/media/image/' + itm.img}
                            alt={itm.title}
                          />

                          <Carousel.Caption>
                            <p>{itm.title}</p>
                          </Carousel.Caption>
                        </Link>
                      </Carousel.Item>
                    )
                  })
                }
              </Carousel>
            }
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
  classes: PropTypes.shape(),
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


export default injectSheet(style)
(
  connect(mapStateToProps, {
    getPostsPage,
    getRatesPage,
  })(Home)
)
