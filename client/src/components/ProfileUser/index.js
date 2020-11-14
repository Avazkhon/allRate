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
  getUserForPageById,
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
    const {getUserForPageById, profileId } = this.props;
    getUserForPageById(profileId);
  }

  handleUploded = (fileUploaded, files) => {
    const {
      changeImg,
      getUserForPageById,
      profileId,
    } = this.props;
    return changeImg(fileUploaded, files)
    .then((action) => {
      if (action.status === 'SUCCESS') {
        getUserForPageById(profileId)
      }
      return action;
    })
  }

  render() {
    const {
      userPage: { data: userData },
      lang: { lang },
      classes,
      profileId,
      isPageAuth,
      changeRatingUser,
      getUserForPageById,
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
              isPageAuth &&
              <ImageUploded
                lang={lang}
                changeImg={this.handleUploded}
              />
            }
          </Col>
          <Col xs="12" sm="6" md="5">
            <ListGroup>
              { isPageAuth && <PurseWidget /> }
              <ListGroup.Item>
                <FiUsers title={profileText.titleCountSubscribers[lang]}/> {" "}
                { userData && userData.subscribersCount || 0 }
              </ListGroup.Item>
              <ListGroup.Item>
                <RiUserVoiceLine title={profileText.titleCountSubscriptions[lang]}/> {" "}
                { userData && userData.subscriptionsCount || 0 }
              </ListGroup.Item>
              {
                !isPageAuth &&
                <ListGroup.Item>
                  <Rating
                    changeRating={changeRatingUser}
                    getUserById={getUserForPageById}
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
  changeImg: PropTypes.func,
  changeRatingUser: PropTypes.func,
  auth: PropTypes.shape(),
  lang: PropTypes.shape(),
  userPage: PropTypes.shape(),
  profileId: PropTypes.string,
  isPageAuth: PropTypes.bool,
}

function mapStateToProps(state) {
  const {
    auth,
    userPage,
    lang,
  } = state;
  return {
    auth,
    userPage,
    lang,
  };
}

export default connect(mapStateToProps, {
  changeImg,
  getUserForPageById,
  changeRatingUser,
})(ProfileUser);
