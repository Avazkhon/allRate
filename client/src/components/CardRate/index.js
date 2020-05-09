import React from 'react';
import PropTypes from 'prop-types';


import {
  Card,
  Button,
} from 'react-bootstrap';

const CardRate = () => {
  return (
    <Card>
      <Card.Header>Featured</Card.Header>
      <Card.Body>
        <Card.Title>Special title treatment</Card.Title>
        <Card.Text>
          With supporting text below as a natural lead-in to additional content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  )
}

CardRate.propType = {
}

export default CardRate
