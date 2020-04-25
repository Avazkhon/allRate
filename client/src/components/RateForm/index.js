import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';

import {
  Row,
  Col,
  Form,
  Button,
} from 'react-bootstrap';

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
      isRedirectToMe: false,
		}
	}

  componentDidMount () {
    const { rateId } = this.props;
    this.changeState(rateId);
  }

  componentDidUpdate (prevProps) {
    const prevRateId = prevProps.rateId;
    const nexRateId = this.props.rateId;
    if (prevRateId !== nexRateId) {
      this.changeState(nexRateId);
    }
  }

  changeState = (id) => {
    const { getRateByID } = this.props;
    isFunction(getRateByID)
    && getRateByID(id).then((res) => {
      if (res.response) {
        this.setState({ data: res.response });
      }
    });
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
    if (typeof creteNewRate === "function") {
      creteNewRate(data).then((action) => {
        if (action.response && action.response.result) {
          this.setState({ isRedirectToMe: true })
        } else {
          console.log(action.error);
        }
      })
    }
  }

  handleChangeSubmit = () => {
    const { data } = this.state;
    const { putRateByID } = this.props;
    if (typeof putRateByID === "function") {
      putRateByID(data)
    }
  }

  handleChangeRateLiveByID = () => {
    const { data } = this.state;
    const { putRateLiveByID } = this.props;
    if (typeof putRateLiveByID === 'function') {
      putRateLiveByID('finish', data._id);
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
      }
    } = this.state;

    const {
      creteNewRate,
      getRateByID,
      putRateLiveByID,
      titleFrom,
    } = this.props;

    return(
      <>
        <h4>{titleFrom}</h4>
        <MainProps
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
          party={party}
          handleChangeRate={this.handleChangeRate}
          handleDeleteDraw={this.handleDeleteDraw}
        />
        <Row>
        {
          creteNewRate &&
          <Col>
            <Button onClick={this.handleCreateSubmit} >
              Создать
            </Button>
          </Col>
        }
        {
          getRateByID &&
          <Col>
            <Button onClick={this.handleChangeSubmit}>
              Изменить
            </Button>
          </Col>
        }
        {
          putRateLiveByID &&
          (statusLife === rateStatusLive.active || statusLife === rateStatusLive.new) &&
          <Col>
            <Button onClick={this.handleChangeRateLiveByID}>
              Завершить ставку
            </Button>
          </Col>
        }
        {
          getRateByID &&
          <Col>
            <Button onClick={this.handleChangeSubmit}>
              Добавить в архив
            </Button>
          </Col>
        }
        </Row>
      </>
    )
  }
};

RateForm.propType = {
  creteNewRate: PropTypes.func,
  putRateByID: PropTypes.func,
  getRateByID: PropTypes.func,
  putRateLiveByID: PropTypes.func,
  rateId: PropTypes.string,
  titleFrom: PropTypes.string,
}

export default RateForm;
