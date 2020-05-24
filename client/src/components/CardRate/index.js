import React from 'react';
import PropTypes from 'prop-types';
import { AiFillEye } from "react-icons/ai";


import {
  Card,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
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
    views,
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
        {
          isShow &&
          <Card.Text>{description}</Card.Text>
        }
      </Card.Body>
      { isShow &&
        <Card.Body>
        <PartyList
        party={party}
        />
        </Card.Body>
      }
      <ListGroup className="list-group-flush">
        <ListGroupItem>{dateStart}</ListGroupItem>
        <ListGroupItem>{dateFinish}</ListGroupItem>
      </ListGroup>
      <Card.Body as={Row}>
        <Col ms="2">
          <AiFillEye title="Просмотры"/> {views}
        </Col>
        <Col>
          <Card.Link
            href={`/make-rate?rateId=${_id}`}
          >
            Перейти
          </Card.Link>
        </Col>
        <Col>
          <Card.Link
            onClick={isShow ? handleHidden : handleShow}
            data-id={_id}
            data-actionname="rate"
          >
            {isShow ? 'Скрыть' : 'Просмотреть'}
          </Card.Link>
        </Col>
        <Col>
          <Rating
            changeRating={changeRating}
            rating={rating}
            postId={_id}
            isShow={isShow}
          />
        </Col>
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
