import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FiUsers } from 'react-icons/fi';
import queryString from 'query-string';

import {
  Row,
  Col,
  Card,
  Button,
} from 'react-bootstrap';

import {
  addSubscription,
  deleteSubscriptions,
  changeRatingUser,
  userPaginate,
} from 'actions';

import Rating from 'widgets/Rating';
import NexLoadPage from 'widgets/NexLoadPage';
import Messages from 'components/Messages';

const userCardText = {
  subscription: { RU: 'Подписаться', EN: 'Subscription' },
  unsubscribe: { RU: 'Отписаться', EN: 'Unsubscribe' },
  titleCountSubscribers: { RU: 'Количестко подписчиков', EN: 'Number of subscribers' },
  follow: { RU: 'Перейти', EN: 'follow' }
}

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

  makeBeforeState = (subscriptionId, { newWarning, newError } = {}) => {
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
          this.makeBeforeState(
            subscription,
            { newWarning: 'Отписка успешна выполнена' }
          );
        } else {
          this.makeBeforeState(
            subscription,
            { newError: action.error }
          );
        }
      });
    } else {
      addSubscription(subscription, userId)
      .then((action) => {
        if (action.status === 'SUCCESS') {
          this.makeBeforeState(
            subscription,
            { newWarning: 'Подписка успешна оформлена' }
          );
        } else {
          this.makeBeforeState(
            subscription,
            { newError: action.error }
          );
        }
      });
    }
  }

  getUrlForUserPage(auth, user) {
    let urlForUserPage = '';
    if (auth) {
      if (auth.userId === user._id) { urlForUserPage = '/me' }
      else { urlForUserPage = `/profile/${user._id}`}
    } else { urlForUserPage = `/profile/${user._id}`}
    return urlForUserPage;
  }

  render() {
    const {
      errors,
      warnings,
      isFetchings,
    } = this.state;
    const {
      auth: {
        auth
      },
      usersPages: {
        data: users,
        isFetchings: isFetchingsLoadUsers,
      },
      subscriptions: {
        data: subscriptions
      },
      lang: { lang },
      changeRatingUser,
      history,
      userPaginate,
    } = this.props;


    return (
      <>
        {
          users && users.docs &&
          users.docs.map((user) => {
            const isSubscription = subscriptions &&
              subscriptions.subscriptions.find((subscription) => {
                return subscription.userId === user._id;
              });
            const isFetchingforUser = isFetchings.find((isFetching) => {
              return isFetching.id === user._id && isFetching.isFetching;
            });
            const errorUser = errors.find(error => error.id === user._id);
            const warningUser = warnings.find(warning => warning.id === user._id);
            let urlForUserPage = this.getUrlForUserPage(auth, user);

            return (
              <Card key={user._id}>
                <Card.Header>{user.userName}</Card.Header>
                <Card.Body>
                  <Row>
                    <Col xs="12" sm="6" md="4">
                      <Card.Img
                        src={(user.avatar && '/media/image/' + user.avatar + '?resize=200') || 'https://html5css.ru/w3css/img_avatar3.png'}
                        alt="Card image"
                        style={{ width: '8rem' }}
                      />
                    </Col>
                    <Col xs="12" sm="6" md="5">
                      <Card.Text>
                        Новый пользователь
                        {user.description}
                      </Card.Text>
                    </Col>
                    <Col xs="12" sm="12" md="3">
                      <FiUsers title={userCardText.titleCountSubscribers[lang]}/> {user.subscribersCount}
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Footer>
                <Row>
                {
                  auth && auth.userId !== user._id &&
                  <Col>
                    <Button
                      data-subscription={user._id}
                      name={isSubscription && isSubscription.toString() }
                      variant="primary"
                      size="sm"
                      onClick={this.handleAddSubscription}
                      disabled={isFetchingforUser}
                    >
                      {isSubscription ? userCardText.unsubscribe[lang] : userCardText.subscription[lang]}
                    </Button>
                  </Col>
                }
                <Col>
                  <Rating
                    changeRating={changeRatingUser}
                    rating={user.rating}
                    objectId={user._id}
                  />
                </Col>
                <Col>
                  <Card.Link href={urlForUserPage}>
                    {userCardText.follow[lang]}
                  </Card.Link>
                </Col>
                </Row>
                <Messages
                  error={errorUser && errorUser.error}
                  warning={warningUser && warningUser.warning}
                />
                </Card.Footer>
              </Card>
            )
          })
        }

        <NexLoadPage
          isFetching={isFetchingsLoadUsers}
          hasNextPage={users && users.hasNextPage}
          actionForLoad={userPaginate}
          history={history}
        />

      </>
    );
  }
}

CardUser.propTypes = {
  addSubscription: PropTypes.func,
  deleteSubscriptions: PropTypes.func,
  userPaginate: PropTypes.func,
  usersPages: PropTypes.shape({}),
  auth: PropTypes.shape({}),
  subscriptions: PropTypes.shape({}),
  history: PropTypes.shape(),
}

function mapStateToProps(state) {
  const {
    auth,
    usersPages,
    subscriptions,
    lang,
  } = state;
  return {
    auth,
    usersPages,
    subscriptions,
    lang,
  };
}

export default connect(mapStateToProps, {
  addSubscription,
  deleteSubscriptions,
  changeRatingUser,
  userPaginate,
})(CardUser);
