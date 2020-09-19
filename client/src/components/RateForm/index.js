import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import injectSheet from 'react-jss';

import {
  ListGroup,
} from 'react-bootstrap';

import Messages from 'components/Messages';

import {
  isFunction,
} from 'utils';

import {
  rateStatusLive,
} from '../../constants';

import MainProps from './MainProps';
import Party from './Party';

import style from './style';

class RateForm extends Component {
  constructor(props) {
		super(props);
		this.state = {
      data: {
        title: '',
        description: '',
        party: [
          {
            id: 1,
            participator: '',
            description: '',
          },
          {
            id: 2,
            participator: '',
            description: '',
          },
          {
            id: 3,
            participator: 'Ничья',
            description: 'Ни одна сторана не выиграет',
          },
        ],
        mainBet: {
          idPartyVictory: 0,
          partyOne: {
            idParty: 1,
            participants: [],
            terms: 'Победа',
          },
          partyTwo: {
            idParty: 2,
            participants: [],
            terms: 'Победа',
          },
          partyDraw: {
            idParty: 3,
            participants: [],
            terms: 'Ничья',
            coefficient: 1, // сервер по умочанию не устанавливает коэффициент
          },
        },
        dateStart: new Date(),
        dateFinish: new Date(),
        differenceTime: 0,
      },

      validatinos: {
        title: '',
        description: '',
        party: [],
        file: ''
      },

      file: '',
      warning: '',
		}
	}

  componentDidUpdate (prevProps) {
    const { data } = this.props.rate;
    if (!prevProps.rate.data && data) {
      this.setState({ data: data });
    };
  }

  checkLength = (string, warning, lengthMin, lengthMax, isNotValidArray) => {
    let message = warning || 'Обезательное поле';
    if (string.length < lengthMin) {
      message += `(минимальная длина ${lengthMin})`;
      isNotValidArray.push(false);
    } else if (lengthMax && string.length > lengthMax) {
      isNotValidArray.push(false);
      message += `(максимальная длина ${lengthMax})`;
    } else {
      message = '';
    }
    return message;
  };


  checkValid = () => {
    const { data, validatinos, file } = this.state;
    const { checkLength } = this;
    let isNotValidArray = [];
    const newValidatinos = {
      ...validatinos,
      title: checkLength(data.title, '', 3, 50, isNotValidArray),
      description: checkLength(data.description, '', 10, 500, isNotValidArray),
      party: data.party.map((itm) => ({
        ...itm,
        participator: checkLength(itm.participator, '', 3, 50, isNotValidArray),
        description: checkLength(itm.description, '', 10, 2000, isNotValidArray)
      })),
      file: file ? '' : 'Выберете изображения'
    }
    this.setState({validatinos: newValidatinos});
    return isNotValidArray.some(isValid => {
      if (!!isValid) {
        return  false;
      } else {
        return true;
      }
    });
  }

  changeState = (action) => {
    if (action.status === 'SUCCESS') {
      this.setState({
        data: action.response,
        warning: 'Ставка успешно обновлена!',
      });
    };
    return action;
  }

  handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      data: {
        ...this.state.data,
        [name]: value
      }
    })
  }

  handleChangeDateStart = (res) => {
    const { differenceTime } = this.state.data;
    const value = new Date(new Date(res[0]).setMilliseconds(differenceTime *60*60*1000));
    this.setState((prevState) => ({
      data: {
        ...prevState.data,
        dateStart: value,
      }
    }))
  }

  handleChangeDateFinisOrAlert = (res) => {
    const { differenceTime, dateAlert, dateFinish } = this.state.data;
    const value = new Date(new Date(res[0]).setMilliseconds(differenceTime *60*60*1000));
    const nameProps = dateAlert && 'dateAlert' || dateFinish && 'dateFinish';
    this.setState((prevState) => ({
      data: {
        ...prevState.data,
        [nameProps]: value,
      }
    }))
  }

  handleChangeDifferenceTime = (event) => {
    const { value } = event.currentTarget;
    this.setState((prevState) => ({
      data: {
        ...prevState.data,
        differenceTime: value,
      }
    }))
  }

  handleChangeRate = (e) => {
    const name = e.target.name;
    const id = e.currentTarget.dataset.id;
    const label = e.currentTarget.dataset.label;
    const value = e.target.value;
    const {
      data: {
        party
      },
      data,
    } = this.state;
    const newsparty = party.map((rate) => {
      if (Number(rate.id) === Number(id)) {
        rate[name] = value;
        rate.label = label;
      }
      return rate;
    });

    this.setState({
      data: {
        ...data,
        party: newsparty,
      }
    })
  }

  handleDeleteDraw = () => {
    const { party, mainBet } = this.state.data;
    const newParty = party.filter(party => party.id !== 3);
    delete mainBet.partyDraw,
    this.setState((prevState) => ({
      data: {
        ...prevState.data,
        party: newParty,
        mainBet,
      }
    }))
  }


  handleDeleteDateFinisOrAlert = (e) => {
    const { name } = e.currentTarget;
    const elseName = name === 'dateFinish' ? 'dateAlert' : 'dateFinish'
    const { data } = this.state;
    delete data[elseName];
    data[name] = new Date();
    this.setState({ data });
  }

  handleCreateSubmit = () => {
    if (!!this.checkValid()) return;

    const { data, file } = this.state;
    data.createTime = new Date();
    const { creteNewRate, changeImg } = this.props;
    this.setState({ warning: '' });
    if (typeof creteNewRate === "function") {
      creteNewRate(data)
      .then(this.changeState)
      .then((action) => {
        if (action.status === 'SUCCESS') {
          changeImg('rate', [file], { rateId: action.response._id });
        }
      });
    }
  }

  handleChangeSubmit = () => {
    const { data } = this.state;
    const { putRateByID } = this.props;
    this.setState({ warning: '' });
    if (typeof putRateByID === "function") {
      putRateByID(data).then(this.changeState)
    }
  }

  handleChangeRateLiveByID = (e) => {
    const { name } = e.currentTarget;
    const { data } = this.state;
    const { putRateLiveByID } = this.props;
    this.setState({ warning: '' });
    if (typeof putRateLiveByID === 'function') {
      putRateLiveByID(name, data._id).then(this.changeState);
    }
  }

  HandleMakeVictory = (e) => {
    const { name } = e.currentTarget;
    this.setState((prevState) => ({
      data: {
        ...prevState.data,
        mainBet: {
          ...prevState.data.mainBet,
          idPartyVictory: name
        }
      }
    }))
  }

  handleChangeRateSelectVictory = () => {
    const { putRateSelectVictory } = this.props;
    const {
      data: {
        _id,
        mainBet,
        mainBet: {
          idPartyVictory
        },
      }
    } = this.state;
    const partyMainBet = {
      partyOne: mainBet.partyOne,
      partyTwo: mainBet.partyTwo,
      partyDraw: mainBet.partyDraw,
    };
    const keyParty = Object.keys(partyMainBet);
    const selectParty = keyParty.find(party => partyMainBet[party] && (+partyMainBet[party].idParty === +idPartyVictory))
    this.setState({ warning: '' });
    if (typeof putRateSelectVictory === 'function') {
      putRateSelectVictory(selectParty, _id).then(this.changeState)
    }
  }

  selectFile = (e) => {
    this.setState({
      file: e.target.files[0],
    })
  }

  render() {
    const {
      data: {
        title,
        description,
        dateStart,
        dateFinish,
        differenceTime,
        party,
        mainBet,
        dateAlert,
        statusLife,
      },
      validatinos,
      warning,
    } = this.state;

    const {
      creteNewRate,
      getRateByID,
      putRateLiveByID,
      titleFrom,
      classes,
      rate: {
        error,
        isFetching,
      }
    } = this.props;
    const isArchive = rateStatusLive.archive === statusLife;
    const isFinish = rateStatusLive.finish === statusLife;

    return(
      <>
        <h4>{titleFrom}</h4>
        <MainProps
          validatinos={validatinos}
          disabled={isArchive}
          title={title}
          description={description}
          handleChange={this.handleChange}
          dateStart={dateStart}
          handleChangeDateStart={this.handleChangeDateStart}
          dateFinish={dateFinish}
          dateAlert={dateAlert}
          differenceTime={differenceTime}
          handleChangeDateFinisOrAlert={this.handleChangeDateFinisOrAlert}
          handleChangeDifferenceTime={this.handleChangeDifferenceTime}
          handleDeleteDateFinisOrAlert={this.handleDeleteDateFinisOrAlert}
        />
        <Party
          validatinos={validatinos.party}
          isArchive={isArchive}
          isPaymentMade={mainBet.paymentMade}
          isFinish={isFinish}
          party={party}
          idPartyVictory={mainBet.idPartyVictory}
          handleChangeRate={this.handleChangeRate}
          handleDeleteDraw={this.handleDeleteDraw}
          HandleMakeVictory={this.HandleMakeVictory}
        />
        {
          creteNewRate &&
          <ListGroup>
            <ListGroup.Item>
              <input
                className={validatinos.file && classes.isNotFilled}
                title={validatinos.file}
                accept=".jpeg, .jpg"
                type="file"
                name="post"
                onChange={this.selectFile}
              />
            </ListGroup.Item>
          </ListGroup>
        }

        <div className={classes['btn-group']}>
        {
          creteNewRate &&
          <button
            disabled={isFetching}
            onClick={this.handleCreateSubmit}
          >
            Создать
          </button>
        }
        {
          getRateByID && !isArchive && !isFinish &&
          <button
            onClick={this.handleChangeSubmit}
            disabled={isFetching}
          >
            Изменить
          </button>
        }
        {
          (statusLife === rateStatusLive.active || statusLife === rateStatusLive.new) &&
          <button
            name={rateStatusLive.finish}
            onClick={this.handleChangeRateLiveByID}
            disabled={isFetching}
          >
            Завершить ставку
          </button>
        }
        {
          isFinish &&
            <button
              name={rateStatusLive.archive}
              onClick={this.handleChangeRateLiveByID}
              disabled={isFetching}
            >
              Добавить в архив
            </button>
        }
        {
          !isArchive && isFinish && !mainBet.paymentMade &&
          <button
            name={rateStatusLive.archive}
            onClick={this.handleChangeRateSelectVictory}
            disabled={isFetching}
          >
            Сделать выплатить
          </button>
        }
        </div>
        <Messages
          error={error}
          warning={warning}
          isFetching={isFetching}
        />
      </>
    )
  }
};

RateForm.propTypes = {
  creteNewRate: PropTypes.func,
  putRateByID: PropTypes.func,
  getRateByID: PropTypes.func,
  putRateLiveByID: PropTypes.func,
  putRateSelectVictory: PropTypes.func,
  changeImg: PropTypes.func,
  titleFrom: PropTypes.string,
  classes: PropTypes.shape({}),
}

export default injectSheet(style)(RateForm);
