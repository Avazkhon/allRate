import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router'

import './style.css';
import Party from './Party';
import MainProps from './MainProps';

import {
  isFunction,
} from '../../utils';

const partyInit = (id) => ({
  id,
  participator: '',
  description: '',
});

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
      if (rate.id === Number(id)) {
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
    console.log(this.state.data);
  }

  render() {
    const {
      data: {
        title,
        description,
        party,
        dateStart,
        dateFinish,
      },
      isRedirectToMe,
    } = this.state

    const {
      creteNewRate,
      getRateByID,
    } = this.props;

    if (isRedirectToMe) {
      return <Redirect to="/me" />
    }

    return(
      <div
        className="create-rate"
      >
        <form className="create-rate_form">
          <div className="create-rate_wrapper">
            <div className="create-rate_title" >Создание ставки</div>
            <MainProps
              title={title}
              description={description}
              handleChange={this.handleChange}
              dateStart={dateStart}
              handleChangeDateStart={this.handleChangeDateStart}
              dateFinish={dateFinish}
              handleChangeDateFinish={this.handleChangeDateFinish}
            />
            <div className="create-rate_content">
                <div>

                  <Party
                    party={party}
                    handleChangeRate={this.handleChangeRate}
                  />

                  <div className="create-rate_add-rate-title">Добавить ставку</div>
                  <input
                    onChange={this.handleChange}
                    title="Добавить ставку"
                    className="create-rate_add-rate-item"
                    type="button"
                    onClick={this.handleAddParty}
                    value="+"
                  >
                  </input>
                </div>
            </div>
            <div className="create-rate_btn-group">
              {
                creteNewRate &&
                <input
                  className="create-rate_btn"
                  type="button"
                  value="Создать"
                  onClick={this.handleCreateSubmit}
                />
              }
              {
                getRateByID &&
                <input
                  className="create-rate_btn"
                  type="button"
                  value="Изменить"
                  onClick={this.handleChangeSubmit}
                />
              }
            </div>
          </div>
        </form>
      </div>
    )
  }
}

RateForm.propType = {
  creteNewRate: PropTypes.func,
  getRateByID: PropTypes.func,
  rateId: PropTypes.string,
}

export default RateForm;
