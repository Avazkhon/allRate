import React from 'react';
import PropTypes from 'prop-types';


import {
  Card,
  ListGroup,
  ListGroupItem,
} from 'react-bootstrap';

import Rating from 'widgets/Rating';
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
    rating,
  },
  changeRating,
  isShow,
  handleHidden,
  handleShow,
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
      <div
        onClick={isShow ? handleHidden : handleShow}
        data-id={_id}
        data-actionname="rate"
      >
        {isShow ? 'Скрыть' : 'Просмотреть'}
      </div>
        { rating &&
          <Rating
            changeRating={changeRating}
            rating={rating}
            postId={_id}
            isShow={isShow}
          />
        }
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
  changeRating: PropTypes.func,
  handleShow: PropTypes.func,
  handleHidden: PropTypes.func,
}

export default CardPost
