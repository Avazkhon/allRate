import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  Form,
  Button,
} from 'react-bootstrap';

import {
  addCountViews,
} from 'actions';

import Messages from 'components/Messages';
import CardPost from 'components/CardPost';
import CardRate from 'components/CardRate';

class MyList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idOpenItm: null,
    }
  }

  handleShow = (e) => {
    const { addCountViews } = this.props;
    const { id } = e.currentTarget.dataset;
    this.setState({
      idOpenItm: id
    });
    addCountViews(id);
  }

  handleHidden = (e) => {
    this.setState({
      idOpenItm: null
    });
  }

  render() {
    const {
      idOpenItm,
    } = this.state;
    const {
      myList,
    } = this.props;

    return (
      <div>
      {
        myList.map((itm) => {
          if (itm.mainBet) {
            return (
              <CardRate key={itm._id}
                rate={itm}
              />
            )
          } else {
            return (
              <CardPost key={itm._id}
                post={itm}
                handleShow={this.handleShow}
                handleHidden={this.handleHidden}
                isShow={idOpenItm === itm._id}
              />
            )
          }
        })
      }
      </div>
    );
  }
}

MyList.propType = {
  myList: PropTypes.shape({}),
  addCountViews: PropTypes.func,
}

function mapStateToProps(state) {
  const {
    // auth,
  } = state;
  return {
    // auth,
  };
}

export default connect(mapStateToProps, {
  addCountViews,
})(MyList);
