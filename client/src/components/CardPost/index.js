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

const cardPostText = {
  show: { RU: 'Просмотреть', EN: 'show' },
  hidden: { RU: 'Скрыть', EN: 'Hidden' },
  views: { RU: 'Просмотры', EN: 'Views' }
};

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
  changeRating,
  isShow,
  classes,
  lang,
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
            <AiFillEye title={cardPostText.views[lang]}/> {views}
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
      <Card.Body>
        <Card.Link
          onClick={isShow ? handleHidden : handleShow}
          data-id={_id}
          data-actionname="post"
          className={classes.btn}
        >
          {isShow ? cardPostText.hidden[lang] : cardPostText.show[lang]}
        </Card.Link>
      </Card.Body>
    </Card>
  )
}

CardRate.propType = {
  classes: PropTypes.shape({}),
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
