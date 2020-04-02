import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  Row,
  Col,
  Button,
  Image,
  Card,
} from 'react-bootstrap';

import {
  getUserById,
} from 'actions';

import PurseWidget from 'widgets/PurseWidget';
import PersonData from './PersonData';

const srcImage = 'https://img.favpng.com/8/0/5/computer-icons-user-profile-avatar-png-favpng-6jJk1WU2YkTBLjFs4ZwueE8Ub.jpg'

class ProfileUser extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    const { getUserById } = this.props;
    let { auth } = this.props;
    auth = auth && auth.auth || null;
    if (auth && auth.userId) {
      getUserById(auth.userId)
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { getUserById } = prevProps;
    let { auth } = prevProps;
    let { auth: userId } = this.props;

    userId = userId && userId.auth && userId.auth.userId
    auth = auth && auth.auth || null;
    if (
      (auth && userId
      && userId
      && auth.userId !== userId)
      || (!auth && userId)
    ) {
      getUserById(userId);
    }
  }

  render() {
    const {
      auth: { userData },
      classes
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
            <Image src={srcImage} thumbnail alt="Avatar" />
            <Button>
              Изменить фото
            </Button>
          </Col>
          <Col xs="12" sm="6" md="5">
            <PurseWidget />
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

ProfileUser.propType = {
  getUserById: PropTypes.func,
  auth: PropTypes.shape({}),
}

function mapStateToProps(state) {
  const {
    auth,
  } = state;
  return {
    auth,
  };
}

export default connect(mapStateToProps, {
  getUserById,
})(ProfileUser);
