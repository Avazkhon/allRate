import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AiFillEye } from "react-icons/ai";


import {
  Card,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Modal,
} from 'react-bootstrap';

import Rating from 'widgets/Rating';
import PartyList from './PartyList';

const CardComponent = ({
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
    authorId,
  },
  auth: {
    auth
  },
  changeRating,
  isShow,
  handleHidden,
  handleShow,
  getCommonRates,
  user,
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
        <Col ms="4">
          <Card.Img
            src="https://html5css.ru/w3css/img_avatar3.png"
            alt="Card image"
            style={{ width: '2rem' }}
          />
          <Card.Link
            href={`profile/${user && user._id}`}
          >
            {' '}{user && user.userName}
          </Card.Link>
        </Col>
        <Col ms="2">
          <AiFillEye title="Просмотры"/> {views}
        </Col>
        <Col>
          <Card.Link
            href={`/make-rate?rateId=${_id}`}
          >
            Перейти
          </Card.Link>
          {
            auth && auth.userId === authorId &&
            <Card.Link
              href={`/card-rate/${_id}`}
            >
              Редактировать
            </Card.Link>
          }
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
            getCommonRates={getCommonRates}
            rating={rating}
            postId={_id}
            isShow={isShow}
          />
        </Col>
      </Card.Body>
    </Card>
  )
}

const CardPost = ({
  rate,
  auth,
  changeRating,
  isShow,
  handleHidden,
  handleShow,
  getCommonRates,
  user,
}) => {
  if (!isShow) {
    return (
      <CardComponent
        rate={rate}
        user={user}
        getCommonRates={getCommonRates}
        handleShow={handleShow}
        handleHidden={handleHidden}
        changeRating={changeRating}
        auth={auth}
      />
    )
  } else {
    return (
      <Modal show={isShow} onHide={handleHidden}>
        <Modal.Header closeButton>
          <Modal.Title>Подробная информация</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CardComponent
            rate={rate}
            user={user}
            getCommonRates={getCommonRates}
            handleShow={handleShow}
            handleHidden={handleHidden}
            changeRating={changeRating}
            isShow
            auth={auth}
          />
        </Modal.Body>
      </Modal>
    )
  }
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
  user: PropTypes.arrayOf({}),
  auth: PropTypes.arrayOf({}),
  changeRating: PropTypes.func,
  handleShow: PropTypes.func,
  handleHidden: PropTypes.func,
  getCommonRates: PropTypes.func,
}

function mapStateToProps(state) {
  const {
    auth,
  } = state;
  return {
    auth,
  }
}

export default connect(mapStateToProps, {})(CardPost)
