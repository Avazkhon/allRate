import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';

const text = {
  warning: {
    EN: 'Translation completed successfully',
    RU: 'Перевод успешно выполнен.'
  },
  error: {
    EN: 'The translation was not completed, there was some kind of error. Write to support',
    RU: 'Перевод не выполнил, произошла какая то ошибка. Напишите на в поддержку.'
  }
};

import Messages from 'components/Messages';

import Layout from './Layout';

function Translation({
  match: {
    params: {
      status
    }
  },
  lang: {
    lang
  }
}) {

  return (
    <Layout>
      <Row>
        <Col xs="12" sm="8" md="9">
          {
            status === 'successful' &&
              <Messages
                warning={text.warning[lang]}
                isFetching={false}
              />
          }
          {
            status === 'fail' &&
              <Messages
                error={text.error[lang]}
                isFetching={false}
              />
          }
        </Col>
      </Row>
    </Layout>
  )
}

Translation.propTypes = {
  auth: PropTypes.shape(),
  match: PropTypes.shape(),
  lang: PropTypes.shape(),
};

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
})(Translation);
