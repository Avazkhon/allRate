import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router'

import {
  Row,
  Col,
  Form,
  Button,
} from 'react-bootstrap';

import Party from './Party';
import MainProps from './MainProps';
import ReasonsForBetting from './ReasonsForBetting';

import {
  isFunction,
} from 'utils';

const partyInit = (id) => ({
  id,
  participator: '',
  description: '',
});

const reasonsForBettingInit = (idRFB) => ({
  title: '',
  idParty: '',
  idRFB,
  statusFictory: false,
  bidForItem: [],
})

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
        ],
        reasonsForBetting: [
          {
            title: 'Победа',
            idParty: '1',
            idRFB: '1',
            statusFictory: false,
            bidForItem: [],
          },
          {
            title: 'Победа',
            idParty: '2',
            idRFB: '2',
            statusFictory: false,
            bidForItem: [],
          }
        ],
        dateStart: new Date(),
        dateFinish: new Date(),
      },
      isRedirectToMe: false,
		}
	}

  // componentWillUnmount() {
  // }

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

  handleAddParty = () => {
    const { data } = this.state;
    this.setState({
      data: {
        ...data,
        party: [
          ...data.party,
          partyInit(data.party.length + 1)
        ]
      }
    })
  }

  handleAddRFB = () => {
    const { data } = this.state;
    this.setState({
      data: {
        ...data,
        reasonsForBetting: [
          ...data.reasonsForBetting,
          // преобразование в строку нужно для того чтобы
          // корректно устанавливать value для select
          reasonsForBettingInit(String(data.reasonsForBetting.length + 1))
        ],
      },
    });
  }

  handleChangeDateStart = (res) => {
    this.setState((prevState) => ({
      data: {
        ...prevState.data,
        dateStart: res,
      }
    }))
  }

  handleChangeDateFinish = (res) => {
    this.setState((prevState) => ({
      data: {
        ...prevState.data,
        dateFinish: res,
      }
    }))
  }

  // RFB = reasonsForBetting
  handleChangeRFB = (e) => {
    const { value } = e.currentTarget
    const { idrfb } = e.currentTarget.dataset
    this.setState((prevState) => ({
      data: {
        ...prevState.data,
        reasonsForBetting: prevState.data.reasonsForBetting.map((RFB) => {
          if (+RFB.idRFB === +idrfb) {
            RFB.title = value;
          };
          return RFB
        })
      }
    }))
  }

  handleChangeIdpartInRFB = (e) => {
    const { value } = e.currentTarget;
    const { id } = e.target.dataset;
    this.setState((prevState) => ({
      data: {
        ...prevState.data,
        reasonsForBetting: prevState.data.reasonsForBetting.map((RFB) => {
          if (+RFB.idRFB === +id) {
            RFB.idParty = value;
          };
          return RFB
        })
      }
    }))
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

  render() {
    const {
      data: {
        title,
        description,
        party,
        dateStart,
        dateFinish,
        reasonsForBetting,
      },
      isRedirectToMe,
    } = this.state

    const {
      creteNewRate,
      getRateByID,
      titleFrom,
    } = this.props;

    if (isRedirectToMe) {
      return <Redirect to="/me" />
    }

    return(
      <>
        <Row className="justify-content-md-center">
          <Col xs="12" sm="8" m="6">
            <Form>
              <MainProps
                title={title}
                description={description}
                handleChange={this.handleChange}
                dateStart={dateStart}
                handleChangeDateStart={this.handleChangeDateStart}
                dateFinish={dateFinish}
                handleChangeDateFinish={this.handleChangeDateFinish}
              />

              <Party
                party={party}
                handleChangeRate={this.handleChangeRate}
              />
              <Row>
                <Col xs={{ span: 2, offset: 10 }} md={{ span: 2, offset: 10 }}>
                  <Button
                    title="Добавить участника"
                    onClick={this.handleAddParty}
                  >
                    +
                  </Button>
                </Col>
              </Row>

              <ReasonsForBetting
                party={party}
                reasonsForBetting={reasonsForBetting}
                handleChangeRFB={this.handleChangeRFB}
                handleChangeIdpartInRFB={this.handleChangeIdpartInRFB}
              />

              <Row>
                <Col xs={{ span: 2, offset: 10 }} md={{ span: 2, offset: 10 }}>
                  <Button
                    title="Добавить условия победы"
                    onClick={this.handleAddRFB}
                  >
                    +
                  </Button>
                </Col>
              </Row>

              {
                creteNewRate &&
                <Row>
                  <Col>
                  <Button onClick={this.handleCreateSubmit} >
                    Создать
                  </Button>
                  </Col>
                </Row>
              }
              {
                getRateByID &&
                <Row>
                  <Col>
                  <Button onClick={this.handleChangeSubmit}>
                    Изменить
                  </Button>
                  </Col>
                </Row>
              }
            </Form>
          </Col>
        </Row>
      </>
    )
  }
};

RateForm.propType = {
  creteNewRate: PropTypes.func,
  putRateByID: PropTypes.func,
  getRateByID: PropTypes.func,
  rateId: PropTypes.string,
  titleFrom: PropTypes.string,
}

export default RateForm;
