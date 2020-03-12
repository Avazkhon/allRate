import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import queryString from 'query-string';
import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';

import SiteBar from 'components/SiteBar';

import style from './style';

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
