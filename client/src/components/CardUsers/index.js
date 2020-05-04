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
import Messages from 'components/Messages';

class CardUser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: [],
      warnings: [],
      isFetchings: [],
    }

  }

  makePrevState = (subscriptionId) => {
    this.setState((prevState) => {
      const isFetchings = prevState.isFetchings.map((isFetching) => {
        if (isFetching && isFetching.id === subscriptionId) {
          isFetching.isFetching = true;
        } else {
          isFetching = {
            isFetching: true,
            id: subscriptionId
          }
        };
        return isFetching
      });

      const warnings = prevState.warnings.map((warning) => {
        if (warning && warning.id === subscriptionId) {
          warning.warning = '';
        } else {
          warning = {
            warning: '',
            id: subscriptionId
          }
        }
        return warning
      });

      const errors = prevState.errors.map((error) => {
        if (error && error.id === subscriptionId) {
          error.error = '';
        } else {
          error = {
            error: '',
            id: subscriptionId
          }
        }
        return error
      })

      return {
        isFetchings: isFetchings.length ? isFetchings : [{
          isFetching: true,
          id: subscriptionId
        }],
        warnings: warnings.length ? warnings :  [{
          warning: '',
          id: subscriptionId
        }],
        errors: errors.length ? errors : [{
          error: '',
          id: subscriptionId
        }],
      }
    })
  }

  makeBeforeSatte = (subscriptionId, { newWarning, newError } = {}) => {
    this.setState((prevState) => {
      return {
        isFetchings: prevState.isFetchings.map((isFetching) => {
          if (isFetching && isFetching.id === subscriptionId) {
            isFetching.isFetching = false;
          }
          return isFetching
        }),
        warnings: prevState.warnings.map((warning) => {
          if (warning && warning.id === subscriptionId) {
            warning.warning = newWarning;
          }
          return warning
        }),
        errors: prevState.errors.map((error) => {
          if (error && error.id === subscriptionId) {
            error.error = newError;
          }
          return error
        })
      }
    })
  }

  handleAddSubscription = (e) => {
    const {
      dataset: {
        subscription,
      },
      name,
    } = e.currentTarget;

    this.makePrevState(subscription);

    const {
      addSubscription,
      deleteSubscriptions,
      auth: { auth: { userId }}
    } = this.props;
    if (name) {
      deleteSubscriptions(subscription, userId)
      .then((action) => {
        if (action.status === 'SUCCESS') {
          this.makeBeforeSatte(
            subscription
          );
        } else {
          this.makeBeforeSatte(
            subscription,
            { newError: action.error }
          );
        }
      });
    } else {
      addSubscription(subscription, userId)
      .then((action) => {
        if (action.status === 'SUCCESS') {
          this.makeBeforeSatte(
            subscription
          );
        } else {
          this.makeBeforeSatte(
            subscription,
            { newError: action.error }
          );
        }
      });
    }
  }

  render() {
    const {
      errors,
      // warnings,
      isFetchings,
    } = this.state;
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
                return subscription.userId === user._id;
              });
            const isFetchingforUser = isFetchings.find((isFetching) => {
              return isFetching.id === user._id && isFetching.isFetching;
            });
            const errorUser = errors.find((error) => {
              return error.id === user._id;
            });
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
                    disabled={isFetchingforUser}
                  >
                  {isSubscription ? 'Отписаться' : 'Подписаться'}
                  </Button>
                }
                <Messages
                  error={errorUser && errorUser.error}
                />
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
