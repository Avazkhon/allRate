import React from 'react';
import PropTypes from 'prop-types';

import {
  Modal,
  Button,
} from 'react-bootstrap';

import Messages from 'components/Messages';

const imageUploded = {
  changeImg: { RU: 'Изменить фото', EN: 'Change image'},
  title: { RU: 'Выбор Фотографии', EN: 'Select image'},
  send: { RU: 'Загрузить', EN: 'Uploaded'},
  warning: { RU: 'Фото успешно загружено', EN: 'Photo uploaded successfully'},
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
    this.setState({
      error: '',
      warning: '',
    })
  }

  onClickHandler = () => {
    const {
      changeImg,
      lang: {
        lang,
      },
    } = this.props
    this.setState({
      isFetching: true,
      error: '',
      warning: '',
    })

    return changeImg([this.state.file])
    .then((action) => {
      if (action.status === 'SUCCESS') {
        this.setState({
          isFetching: false,
          warning: imageUploded.warning[lang],
        })
      } else {
        this.setState({
          isFetching: false,
          error: action.error,
        })
      }
      return action;
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
      lang
    } = this.props;
    return (
      <>
        <Button onClick={this.handleShowModal}>
          {imageUploded.changeImg[lang]}
        </Button>
        <Modal show={isShowModal} onHide={this.handleShowModal}>
          <Modal.Header closeButton>
            <Modal.Title>{imageUploded.title[lang]}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              accept=".jpeg, .jpg"
              onChange={this.handleSelectFile}
              type="file"
              name="fileUploaded"
            />
            <Button onClick={this.onClickHandler}>{imageUploded.send[lang]}</Button>
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

ImageUploded.propTypes = {
  changeImg: PropTypes.func,
  lang: PropTypes.string,
};

export default ImageUploded;
