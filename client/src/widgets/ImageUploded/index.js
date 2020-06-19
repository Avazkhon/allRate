import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  Modal,
  Button,
} from 'react-bootstrap';

import {
  changeImg,
  getUserById,
} from 'actions';

import Messages from 'components/Messages';

const imageUploded = {
  changeImg: { RU: 'Изменить фото', EN: 'Change image'},
}

class ImageUploded extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      isShowModal: false,
      isFetching: false,
      error: '',
      warning: '',
    }
  }

  handleSelectFile = (e) => {
    this.setState({
      file: e.target.files[0]
    });
  }

  onClickHandler = () => {
    const {
      changeImg,
      getUserById,
      auth: {
        auth,
      },
    } = this.props
    this.setState({
      isFetching: true,
      error: '',
      warning: '',
    })
    changeImg('fileUploaded', [this.state.file])
    .then((action) => {
      if (action.status === 'SUCCESS') {
        getUserById(auth.userId)
        this.setState({
          isFetching: false,
          warning: 'Фото успешно загружено',
        })
      } else {
        this.setState({
          isFetching: false,
          error: action.error,
        })
      }
    });
  }

  handleShowModal = () => {
    this.setState((prevState) => ({
      isShowModal: !prevState.isShowModal,
    }))
  }

  render() {
    const {
      isShowModal,
      isFetching,
      error,
      warning,
    } = this.state;
    const {
      lang: {
        lang
      }
    } = this.props;
    return (
      <>
        <Button onClick={this.handleShowModal}>
          {imageUploded.changeImg[lang]}
        </Button>
        <Modal show={isShowModal} onHide={this.handleShowModal}>
          <Modal.Header closeButton>
            <Modal.Title>Подробная информация</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              onChange={this.handleSelectFile}
              type="file"
              name="fileUploaded"
            />
            <Button onClick={this.onClickHandler}>Отправить</Button>
          </Modal.Body>
          <Modal.Footer>
            <Messages
              error={error}
              warning={warning}
              isFetching={isFetching}
            />
          </Modal.Footer>
        </Modal>
      </>
    )
  }
};

ImageUploded.propType = {
  changeImg: PropTypes.func,
  getUserById: PropTypes.func,
  lang: PropTypes.shape({}),
  auth: PropTypes.shape({}),
};

function mapStateToProps (state) {
  const {
    lang,
    auth,
  } = state;
  return {
    lang,
    auth
  };
}
export default connect(
  mapStateToProps,
  {
    changeImg,
    getUserById,
  }
)(ImageUploded);
