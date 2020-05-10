import React from 'react';
import PropTypes from 'prop-types';


import {
  Card,
  Button,
  Row,
  Col,
} from 'react-bootstrap';

import Rating from 'widgets/Rating'

const CardRate = ({
  post: {
    title,
    text,
    _id,
    img,
    views,
    rating,
  }
}) => {
  return (
    <Card>
      <Card.Img variant="top" src={img.url} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{text}</Card.Text>
        <Row>
          <Col>
            views: {views}
          </Col>
          <Col>
            <Rating
              rating={rating}
            />
          </Col>
        </Row>
      </Card.Body>
      <Card.Body>
        <Card.Link
          href={`make-rate?rateId=${_id}`}
        >
          Перейти
        </Card.Link>
      </Card.Body>
    </Card>
  )
}

CardRate.propType = {
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

export default CardRate;
