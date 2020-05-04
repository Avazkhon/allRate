import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FiUsers } from 'react-icons/fi';


import {
  Row,
  Col,
  Card,
  Button,
} from 'react-bootstrap';

import {
  addSubscription,
  deleteSubscriptions,
} from 'actions';

import SiteBar from 'components/SiteBar';
class CardUser extends React.Component {
  constructor(props) {
    super(props);

  }

  handleAddSubscription = (e) => {
    const {
      dataset: {
        subscription,
      },
      name,
    } = e.currentTarget;
    const {
      addSubscription,
      deleteSubscriptions,
      auth: { auth: { userId }}
    } = this.props;
    if (name) {
      deleteSubscriptions(subscription, userId);
    } else {
      addSubscription(subscription, userId);
    }
  }

  render() {
    const {
      auth: {
        auth
      },
      users: {
        data: users,
      },
      subscriptions: {
        data: subscriptions
      }
    } = this.props;
    return (
      <>
        {
          users &&
          users.map((user) => {
            const isSubscription = subscriptions &&
              subscriptions.subscriptions.find((subscription) => {
                return subscription.userId === user._id
              })
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
                      <FiUsers title="количестко подписччиков"/> {user.subscribersCount}
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Footer>
                {
                  auth && auth.userId !== user._id &&
                  <Button
                    data-subscription={user._id}
                    name={isSubscription && isSubscription.toString() }
                    variant="primary"
                    size="sm"
                    onClick={this.handleAddSubscription}
                  >
                  {isSubscription ? 'Отписаться' : 'Подписаться'}
                  </Button>
                }
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
  deleteSubscriptions: PropTypes.func,
  users: PropTypes.shape({}),
  auth: PropTypes.shape({}),
  subscriptions: PropTypes.shape({}),
}

function mapStateToProps(state) {
  const {
    auth,
    users,
    subscriptions,
  } = state;
  return {
    auth,
    users,
    subscriptions
  };
}

export default connect(mapStateToProps, {
  addSubscription,
  deleteSubscriptions,
})(CardUser);
