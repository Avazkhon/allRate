import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

import {
  Row,
  Col,
  Card,
  ListGroup,
  ListGroupItem,
} from 'react-bootstrap';

import PartyList from '../PartyList';

const url = 'https://sun9-39.userapi.com/c852216/v852216813/1239e2/VZL0QayR6E4.jpg?ava=1';

const RateCard = ({
  rateList,
  sort,
}) => (
  <Row>
    {
      rateList && rateList.map((rate) => (
        <Col xs="12" sm="6" md="4" lg="3" key={rate._id}>
          <Card bg="dark" text="white" style={{ width: '14rem' }}>
            <Card.Img variant="top" src={url} />
            <Card.Body>
              <Card.Title>{rate.title}</Card.Title>
              <Card.Text>{rate.description}</Card.Text>
            </Card.Body>
            <Card.Body>
              <PartyList
                party={rate.party}
              />
            </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroupItem variant="dark">{rate.dateStart}</ListGroupItem>
                <ListGroupItem variant="dark">{rate.dateFinish}</ListGroupItem>
              </ListGroup>
            <Card.Body>
              <Card.Link
                href={sort ? `make-rate?rateId=${rate._id}` : `card-rate/${rate._id}`}
              >
                Перейти
              </Card.Link>
            </Card.Body>
          </Card>
        </Col>
      ))
    }
  </Row>
)
RateCard.propType = {
  rateList: PropTypes.shape({}),
  sort: PropTypes.shape({}),
};

export default RateCard;
