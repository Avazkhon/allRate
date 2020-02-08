import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './createNewRate.css';
import CreateRateItems from './CreateRateItems';

// const optionsSade = [
//   {
//     value: 'victory',
//     label: 'На попебеду'
//   },
//   {
//     value: 'losing',
//     label: 'На проигрешь'
//   },
//   {
//     value: 'niemand',
//     label: 'На ничью'
//   }
// ];

class CreateNewRate extends Component {
  constructor(props) {
		super(props);
		this.state = {
      data: {
        title: '',
        description: '',
        rates: [
          {
            id: 1,
            reasonForBid: 'victory',
            label: 'На попебеду',
            side: '',
            description: '',
          },
          {
            id: 2,
            reasonForBid: 'losing',
            label: 'На проигрешь',
            side: '',
            description: '',
          }
        ],
      }
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
        rates
      },
      data,
    } = this.state;
    const newsRates = rates.map((rate) => {
      if (rate.id === Number(id)) {
        rate[name] = value;
        rate.label = label;
      }
      return rate;
    });

    this.setState({
      data: {
        ...data,
        rates: newsRates,
      }
    })
  }

  render() {
    const {
      data: {
        title,
        description,
        rates,
      }
    } = this.state

    return(
      <div
        className="create-rate"
      >
        <form className="create-rate_form">
          <div className="create-rate_title" >Создание ставки</div>

          <div className="create-rate_content">
              <input
                value={title}
                onChange={this.handleChange}
                placeholder="Ввидите заголовок"
                className="create-rate_input"
                type="text"
                name="title"
              >
              </input>
              <textarea
                value={description}
                onChange={this.handleChange}
                placeholder="Ввидите описание"
                className="create-rate_textarea"
                name="description"
              >
              </textarea>
              <div>

                <CreateRateItems
                  rates={rates}
                  handleChangeRate={this.handleChangeRate}
                />

                <div className="create-rate_add-rate-title">Добавить ставку</div>
                <input
                  onChange={this.handleChange}
                  title="Добавить ставку"
                  className="create-rate_add-rate-item"
                  type="button"
                  value="+"
                >
                </input>
              </div>
          </div>
        </form>
      </div>
    )
  }
}

CreateNewRate.propType = {
}

export default CreateNewRate;
