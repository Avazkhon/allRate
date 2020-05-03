import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


import {
  Row,
  Col,
  Card,
  Button,
} from 'react-bootstrap';

import {
  addSubscription,
} from 'actions';

import SiteBar from 'components/SiteBar';
class CardUser extends React.Component {
  constructor(props) {
    super(props);

  }

  handleAddSubscription = (e) => {
    const { subscription } = e.currentTarget.dataset;
    const { addSubscription, auth: { auth: { userId }} } = this.props;
    addSubscription(subscription, userId);
  }

  render() {
    const {
      auth: {
        auth
      },
      users: {
        data: users,
      },
    } = this.props;
    return (
      <>
        {
          users &&
          users.map((user) => {
            return (
              <Card key={user._id}>
                <Card.Header>{user.userName}</Card.Header>
                <Card.Body>
                  <Row>
                    <Col xs="12" sm="6" md="4">
                      <Card.Img
                        src="https://html5css.ru/w3css/img_avatar3.png"
                        alt="Card image"
                        style={{ width: '8rem' }}
                      />
                    </Col>
                    <Col xs="12" sm="6" md="5">
                      <Card.Text>
                        Учитывайте сроки перевода
                        Помните, что датой оплаты считается дата обработки платежа банком, а не дата перевода.
                        Вносите платежи заранее.
                        {user.description}
                      </Card.Text>
                    </Col>
                    <Col xs="12" sm="12" md="3">
                      icon
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Footer>
                  <Button
                    data-subscription={user._id}
                    variant="primary"
                    size="sm"
                    onClick={this.handleAddSubscription}
                  >
                    Подписаться
                  </Button>
                </Card.Footer>
              </Card>
            )
          })
        }
      </>
    );
  }
}

CardUser.propType = {
  addSubscription: PropTypes.func,
  users: PropTypes.shape({}),
  auth: PropTypes.shape({}),
}

function mapStateToProps(state) {
  const {
    auth,
    users,
  } = state;
  return {
    auth,
    users
  };
}

export default connect(mapStateToProps, {
  addSubscription,
})(CardUser);
