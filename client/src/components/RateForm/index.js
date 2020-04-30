import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';

import {
  Row,
  Col,
  Form,
  Button,
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
      warning: '',
		}
	}

  componentDidUpdate (prevProps) {
    const { data } = this.props.rate;
    if (!prevProps.rate.data && data) {
      this.setState({ data: data });
    };
  }

  changeState = (action) => {
    if (action.status === 'SUCCESS') {
      this.setState({
        data: action.response,
        warning: 'Ставка успешно обновлена!',
      });
    }
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


  handleDeleteDateFinisOrAlert = () => {
    const { data } = this.state;
    if (data.dateFinish) {
      delete data.dateFinish;
      data.dateAlert = new Date();
    } else {
      delete data.dateAlert;
      data.dateFinish = new Date();
    }
    this.setState({ data });
  }

  handleCreateSubmit = () => {
    const { data } = this.state;
    const { creteNewRate } = this.props;
    this.setState({ warning: '' });
    if (typeof creteNewRate === "function") {
      creteNewRate(data).then(this.changeState);
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
      warning,
    } = this.state;

    const {
      creteNewRate,
      getRateByID,
      putRateLiveByID,
      titleFrom,
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
          isArchive={isArchive}
          isPaymentMade={mainBet.paymentMade}
          isFinish={isFinish}
          party={party}
          idPartyVictory={mainBet.idPartyVictory}
          handleChangeRate={this.handleChangeRate}
          handleDeleteDraw={this.handleDeleteDraw}
          HandleMakeVictory={this.HandleMakeVictory}
        />
        <Row>
        {
          creteNewRate &&
          <Col>
            <Button
              disabled={isFetching}
              onClick={this.handleCreateSubmit}
            >
              Создать
            </Button>
          </Col>
        }
        {
          getRateByID && !isArchive && !isFinish &&
          <Col>
            <Button
              onClick={this.handleChangeSubmit}
              disabled={isFetching}
            >
              Изменить
            </Button>
          </Col>
        }
        {
          (statusLife === rateStatusLive.active || statusLife === rateStatusLive.new) &&
          <Col>
            <Button
              name={rateStatusLive.finish}
              onClick={this.handleChangeRateLiveByID}
              disabled={isFetching}
            >
              Завершить ставку
            </Button>
          </Col>
        }
        {
          isFinish &&
          <Col>
            <Button
              name={rateStatusLive.archive}
              onClick={this.handleChangeRateLiveByID}
              disabled={isFetching}
            >
              Добавить в архив
            </Button>
          </Col>
        }
        {
          !isArchive && isFinish && !mainBet.paymentMade &&
          <Col>
            <Button
              name={rateStatusLive.archive}
              onClick={this.handleChangeRateSelectVictory}
              disabled={isFetching}
            >
              Сделать выплатить
            </Button>
          </Col>
        }
        </Row>
        <Messages
          error={error}
          warning={warning}
          isFetching={isFetching}
        />
      </>
    )
  }
};

RateForm.propType = {
  creteNewRate: PropTypes.func,
  putRateByID: PropTypes.func,
  getRateByID: PropTypes.func,
  putRateLiveByID: PropTypes.func,
  putRateSelectVictory: PropTypes.func,
  titleFrom: PropTypes.string,
}

export default RateForm;
