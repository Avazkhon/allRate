import React from 'react';
import PropTypes from 'prop-types';


import {
  Card,
  ListGroup,
  ListGroupItem,
} from 'react-bootstrap';

import PartyList from './PartyList';

const CardPost = ({
  rate: {
    title,
    description,
    img,
    dateStart,
    dateFinish,
    _id,
    party,
  },
}) => {
  return (
    <Card>
      <Card.Img variant="top" src={img} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
      <Card.Body>
        <PartyList
          party={party}
        />
      </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>{dateStart}</ListGroupItem>
          <ListGroupItem>{dateFinish}</ListGroupItem>
        </ListGroup>
      <Card.Body>
        <Card.Link
          href={`/make-rate?rateId=${_id}`}
        >
          Перейти
        </Card.Link>
      </Card.Body>
    </Card>
  )
}

CardPost.propType = {
  rate: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    img: PropTypes.string,
    dateStart: PropTypes.string,
    dateFinish: PropTypes.string,
    _id: PropTypes.string,
    party: PropTypes.arrayOf({}),
  }),
}

export default CardPost
