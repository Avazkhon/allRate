import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';

import {
  Button,
  Row,
  Col,
} from 'react-bootstrap';

class NexLoadPage extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    const { actionForLoad, history } = this.props;
    actionForLoad(1, 24);
    history.push({
      search: 'page=1&limit=24',
      hash: history.location.hash
    });
  }

  handleChangePagination = () => {
    const { actionForLoad, history } = this.props;
    const prevQueryParams = queryString.parse(location.search);
    actionForLoad(Number(prevQueryParams.page) + 1, prevQueryParams.limit);
    const nexQueryParams = queryString.stringify({...prevQueryParams, page: Number(prevQueryParams.page) + 1});
    history.push({
      search: nexQueryParams,
      hash: history.location.hash
    });
  }

  render() {
    const {
      hasNextPage,
      history: {
        location
      },
      isFetching,
    } = this.props;
    const { page } = queryString.parse(location.search);

    return (
      <>
        { hasNextPage &&
          <Row>
            <Col md={{ span: 4, offset: 5 }} xs={{ span: 9, offset: 3 }}>
              <Button onClick={this.handleChangePagination}>
                { isFetching ? 'Загрузка...' : 'Загрузить еще'}
              </Button>
            </Col>
          </Row>
        }
      </>
    );
  }
}

NexLoadPage.propTypes = {
  history: PropTypes.shape(),
  actionForLoad: PropTypes.func,
  hasNextPage: PropTypes.bool,
  isFetching: PropTypes.bool,
};


export default NexLoadPage
