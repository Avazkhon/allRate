import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import queryString from 'query-string';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Table,
} from 'react-bootstrap';

import SiteBar from 'components/SiteBar';

import style from './style';

const url = 'https://sun9-39.userapi.com/c852216/v852216813/1239e2/VZL0QayR6E4.jpg?ava=1';
class MakeRateComponent extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    const {
      classes,
      rate,
      auth,
    } = this.props;

    return (
      <div
        className={classes['make-rate']}
      >
      <Container>
        <Row>
          <Col xs="12" sm="3" >
            <SiteBar
              userId={auth.userId}
            />
          </Col>
          <Col xs="12" sm="9">
            <content className={classes['content']}>
              make-rate rateId: {rate && rate._id}
            </content>
            
            {
              rate &&
              <Row>
                {
                  rate.party.map(({participator, description, _id}) => (
                    <Col key={_id} sm="12" sm="6" md="4">
                      <Card style={{ width: '12rem' }}>
                        <Card.Img variant="top" src={url} />
                        <Card.Body>
                          <Card.Title>{participator}</Card.Title>
                          <Card.Text>{description}</Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))
                }
              </Row>
            }

            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Участник</th>
                  <th>Условие</th>
                  <th>Коэффициент</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
      </div>
    );
  }
}

MakeRateComponent.propType = {
  rate: PropTypes.shape({}),
  classes: PropTypes.shape({}),
}

export default injectSheet({...style})(MakeRateComponent);
