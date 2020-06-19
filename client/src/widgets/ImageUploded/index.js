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

const imageUploded = {
  changeImg: { RU: 'Изменить фото', EN: 'Change image'},
}

class ImageUploded extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      isShowModal: false,
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
    changeImg('fileUploaded', [this.state.file])
    .then((action) => {
      if (action.status === 'SUCCESS') {
        getUserById(auth.userId)
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
