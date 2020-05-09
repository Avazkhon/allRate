import React from 'react';
import PropTypes from 'prop-types';


import {
  Card,
  Button,
} from 'react-bootstrap';

const CardRate = ({
  post: {
    title,
    text,
    _id,
    img,
    views,
  }
}) => {
  return (
    <Card>
      <Card.Img variant="top" src={img.url} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{text}</Card.Text>
        views: {views}
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
  })
}

export default CardRate;
