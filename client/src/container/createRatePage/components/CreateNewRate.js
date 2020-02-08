import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './createNewRate.css';
import CreateRateItems from './CreateRateItems';
import CreateMainProps from './CreateMainProps';

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

  render() {
    const {
      data: {
        title,
        description,
        party,
      }
    } = this.state

    return(
      <div
        className="create-rate"
      >
        <form className="create-rate_form">
          <div className="create-rate_title" >Создание ставки</div>
          <CreateMainProps
            titl={title}
            description={description}
            handleChange={this.handleChange}
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
        </form>
      </div>
    )
  }
}

CreateNewRate.propType = {
}

export default CreateNewRate;
