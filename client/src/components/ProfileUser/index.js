import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FiUsers } from 'react-icons/fi';
import { RiUserVoiceLine } from 'react-icons/ri';

import {
  Row,
  Col,
  Button,
  Image,
  Card,
  ListGroup,
} from 'react-bootstrap';

import {
  changeImg,
  getUserById,
  changeRatingUser,
} from 'actions';

import Rating from 'widgets/Rating';
import ImageUploded from 'widgets/ImageUploded';
import PurseWidget from 'widgets/PurseWidget';
import PersonData from './PersonData';

const srcImage = 'https://img.favpng.com/8/0/5/computer-icons-user-profile-avatar-png-favpng-6jJk1WU2YkTBLjFs4ZwueE8Ub.jpg'


const profileText = {
  titleCountSubscribers: { RU: 'Количестко подписччиков', EN: 'Number of subscribers' },
  titleCountSubscriptions: { RU: 'Количестко подписок', EN: 'Number of subscriptions' },
}

class ProfileUser extends React.Component {

  componentDidMount() {
    const { getUserById, profileId } = this.props;
    let { auth } = this.props;
    auth = auth && auth.auth || null;
    if (auth && auth.userId) {
      getUserById(profileId || auth.userId)
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // это штука не всегда хорошо работает но без нее нельзя
    const { getUserById } = prevProps;
    let { auth } = prevProps;
    let { auth: userId, profileId } = this.props;

    userId = userId && userId.auth && userId.auth.userId
    auth = auth && auth.auth || null;
    if (
      (auth && userId
      && userId
      && auth.userId !== userId)
      || (!auth && userId)
    ) {
      getUserById(profileId || userId);
    }
  }

  handleUploded = (fileUploaded, files) => {
    const {
      changeImg,
      getUserById,
      auth: {
        auth
      }
    } = this.props;
    return changeImg(fileUploaded, files)
    .then((action) => {
      if (auth.userId && action.status === 'SUCCESS') {
        getUserById(auth.userId)
      }
      return action;
    })
  }

  render() {
    const {
      auth: { userData },
      lang: { lang },
      classes,
      profileId,
      changeRatingUser,
      getUserById,
    } = this.props;

    let userProps = [];
    if (userData && userData._id) {
      const {
        email,
        userName,
        phone,
      } = userData;

      userProps = [
        { name: email },
        { name: userName },
        { name: phone },
      ];
    }

    return (
      <Card>
        <Row>
          <Col xs="12" sm="6" md="2">
            <Image style={{ height: '190px',  width: '18rem' }} src={userData && userData.avatar || srcImage} thumbnail alt="Avatar" />
            {
              !profileId &&
              <ImageUploded
                lang={lang}
                changeImg={this.handleUploded}
              />
            }
          </Col>
          <Col xs="12" sm="6" md="5">
            <ListGroup>
              { !profileId && <PurseWidget />}
              <ListGroup.Item>
                <FiUsers title={profileText.titleCountSubscribers[lang]}/> {" "}
                { userData && userData.subscribersCount || 0 }
              </ListGroup.Item>
              <ListGroup.Item>
                <RiUserVoiceLine title={profileText.titleCountSubscriptions[lang]}/> {" "}
                { userData && userData.subscriptionsCount || 0 }
              </ListGroup.Item>
              {
                profileId &&
                <ListGroup.Item>
                  <Rating
                    changeRating={changeRatingUser}
                    getUserById={getUserById}
                    rating={userData && userData.rating}
                    postId={userData && userData._id}
                    isShow
                  />
                </ListGroup.Item>
              }
            </ListGroup>
          </Col>
          <Col xs="12" sm="12" md="5">
            <PersonData
              userProps={userProps}
            />
          </Col>
        </Row>
      </Card>
    );
  }
};

ProfileUser.propTypes = {
  getUserById: PropTypes.func,
  changeImg: PropTypes.func,
  changeRatingUser: PropTypes.func,
  auth: PropTypes.shape({}),
  lang: PropTypes.shape({}),
  profileId: PropTypes.number,
}

function mapStateToProps(state) {
  const {
    auth,
    lang,
  } = state;
  return {
    auth,
    lang,
  };
}

export default connect(mapStateToProps, {
  changeImg,
  getUserById,
  changeRatingUser,
})(ProfileUser);
