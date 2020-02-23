import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router'

import './createNewRate.css';
import CreateRateItems from './CreateRateItems';
import CreateMainProps from './CreateMainProps';

const partyInit = (id) => ({
  id,
  participator: '',
  description: '',
});

class CreateNewRate extends Component {
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

  // componentDidMount() {
  // }
  //
  // componentWillUnmount() {
  // }

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

  handleSubmit = () => {
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

  render() {
    const {
      data: {
        title,
        description,
        party,
        dateStart
      },
      isRedirectToMe,
    } = this.state

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
            <CreateMainProps
              titl={title}
              description={description}
              handleChange={this.handleChange}
              dateStart={dateStart}
              handleChangeDateStart={this.handleChangeDateStart}
            />
            <div className="create-rate_content">
                <div>

                  <CreateRateItems
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
              <input
                className="create-rate_btn"
                type="button"
                value="Создать"
                onClick={this.handleSubmit}
              />
            </div>
          </div>
        </form>
      </div>
    )
  }
}

CreateNewRate.propType = {
  creteNewRate: PropTypes.func,
}

export default CreateNewRate;
