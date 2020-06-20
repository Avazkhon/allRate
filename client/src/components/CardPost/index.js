import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { AiFillEye } from "react-icons/ai";


import {
  Card,
  Row,
  Col,
  Modal,
} from 'react-bootstrap';

import Rating from 'widgets/Rating';

import styleCardPost from './styleCardPost';

const cardPostText = {
  show: { RU: 'Просмотреть', EN: 'show' },
  hidden: { RU: 'Скрыть', EN: 'Hidden' },
  views: { RU: 'Просмотры', EN: 'Views' }
};

const CardComponent = ({
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
  changeRating,
  isShow,
  classes,
  lang,
  user,
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
          <Col ms="4">
            <Card.Img
              src="https://html5css.ru/w3css/img_avatar3.png"
              alt="Card image"
              style={{ width: '2rem' }}
            />
            <Card.Link
              href={`/profile/${user && user._id}`}
            >
              {' '}{user && user.userName}
            </Card.Link>
          </Col>
          <Col>
            <AiFillEye title={cardPostText.views[lang]}/> {views}
          </Col>
          <Col ms="2">
            <Card.Link
              onClick={isShow ? handleHidden : handleShow}
              data-id={_id}
              data-actionname="post"
              className={classes.btn}
            >
            {isShow ? cardPostText.hidden[lang] : cardPostText.show[lang]}
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
        </Row>
      </Card.Body>
    </Card>
  )
}

CardComponent.propTypes = {
  classes: PropTypes.shape(),
  user: PropTypes.shape({
    _id: PropTypes.string,
    userName: PropTypes.string,
  }),
  handleShow: PropTypes.func,
  changeRating: PropTypes.func,
  handleHidden: PropTypes.func,
  isShow: PropTypes.bool,
  lang: PropTypes.string,
  post: PropTypes.shape({
    title: PropTypes.string,
    text: PropTypes.string,
    _id: PropTypes.string,
    img: PropTypes.shape({
      url: PropTypes.string,
    }),
    views: PropTypes.number,
    rating: PropTypes.shape(),
  })
}

const CardRate = ({
  post,
  handleShow,
  handleHidden,
  changeRating,
  isShow,
  classes,
  lang,
  user,
}) => {
  if (!isShow) {
    return (
      <CardComponent
        post={post}
        handleShow={handleShow}
        handleHidden={handleHidden}
        changeRating={changeRating}
        classes={classes}
        lang={lang}
        user={user}
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
            post={post}
            handleShow={handleShow}
            handleHidden={handleHidden}
            changeRating={changeRating}
            classes={classes}
            lang={lang}
            user={user}
            isShow
          />
        </Modal.Body>
      </Modal>
    )
  }
}

CardRate.propTypes = {
  classes: PropTypes.shape({}),
  user: PropTypes.shape({}),
  handleShow: PropTypes.func,
  changeRating: PropTypes.func,
  handleHidden: PropTypes.func,
  isShow: PropTypes.bool,
  lang: PropTypes.string,
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
