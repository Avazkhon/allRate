import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';

import {
  Row,
  Col,
  Button,
  ListGroup,
  Image,
  Card,
} from 'react-bootstrap';

import {
  getUserById,
} from 'actions'

class ProfileUser extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    const { getUserById } = this.props;
    let { auth } = this.props;
    auth = auth && auth.auth || null;
    if (auth && auth.userId) {
      getUserById('user/?id='+auth.userId)
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
      getUserById('user/?id='+userId);
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
          <Col xs="12" sm="4" md="3">
            <Image src="holder.js/171x180" thumbnail alt="Avatar" />
            <Button>
              Изменить фото
            </Button>
          </Col>
          <Col xs="12" sm="8" md="9">
            <ListGroup>
              {
                userProps.map((itm) => (
                  <ListGroup.Item key={itm.name}>{itm.name}</ListGroup.Item>
                ))
              }
            </ListGroup>
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
