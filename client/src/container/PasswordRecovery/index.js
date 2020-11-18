import React,{ Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import queryString from 'query-string';
import injectSheet from 'react-jss';

import {
  Container,
  Row,
  Col,
  Form,
  Button,
} from 'react-bootstrap';

import Layout from 'container/Layout';
import SiteBar from 'components/SiteBar';

import style from './style';

class PasswordRecovery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    }
  }

  handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    })
  }

  handleSubmit = () => {
    console.log(this.state.email);
  }

  render() {
    const {
      userData,
      classes,
    } = this.props;
    return (
      <Layout>
        <Container>
          <Row>
            <Col xs="12"  sm="4" md="3">
              <SiteBar
                userData={userData}
              />
            </Col>
            <div className={classes['page-recovery']}>
              <Col xs="12" sm="8" md="9">
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Э-почта</Form.Label>
                  <Form.Control
                      onChange={this.handleChange}
                      placeholder="Введите электронную почту"
                      type="email"
                      name="email"
                    />
                </Form.Group>
              </Col>
              <Col>
                <Button onClick={this.handleSubmit} >Отправить</Button>
              </Col>
            </div>
          </Row>
        </Container>
      </Layout>
    )
  }
}


PasswordRecovery.propTypes = {
  auth: PropTypes.shape(),
  userData: PropTypes.shape(),
  classes: PropTypes.shape(),
  history: PropTypes.shape(),
  match: PropTypes.shape(),
}

function mapStateToProps(state) {
  const {
    auth,
  } = state;
  return {
    auth,
  };
}

export default injectSheet(style)(connect(mapStateToProps, {})(PasswordRecovery));
