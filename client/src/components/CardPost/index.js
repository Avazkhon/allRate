import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { AiFillEye } from "react-icons/ai";


import {
  Card,
  Button,
  Row,
  Col,
} from 'react-bootstrap';

import Rating from 'widgets/Rating';

import styleCardPost from './styleCardPost';

const CardRate = ({
  post: {
    title,
    text,
    _id,
    img,
    views,
    rating,
  },
  handleShow,
  handleHidden,
  isShow,
  classes,
}) => {
  return (
    <Card>
      <Card.Img variant="top" src={img.url} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        {
          isShow &&
          <Card.Text>{text}</Card.Text>
        }
        <Row>
          <Col>
            <AiFillEye title="views"/> {views}
          </Col>
          <Col>
            <Rating
              rating={rating}
              postId={_id}
              isShow={isShow}
            />
          </Col>
        </Row>
      </Card.Body>
      <Card.Body>
        <div
          onClick={isShow ? handleHidden : handleShow}
          data-id={_id}
          className={classes.btn}
        >
          {isShow ? 'Скрыть' : 'Просмотреть'}
        </div>
      </Card.Body>
    </Card>
  )
}

CardRate.propType = {
  classes: PropTypes.shape({}),
  handleShow: PropTypes.func,
  handleHidden: PropTypes.func,
  isShow: PropTypes.bool,
  post: PropTypes.shape({
    title: PropTypes.string,
    text: PropTypes.string,
    _id: PropTypes.string,
    img: PropTypes.shape({
      url: PropTypes.string,
    }),
    views: PropTypes.number,
    raiting: PropTypes.shape({}),
  })
}

export default injectSheet(styleCardPost)(CardRate);
