import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './style.css';

import Party from './components/Party';

import Layout from '../layout';

import {
  getRateByID,
} from '../../actions'

import {
  isFunction,
} from '../../utils';

class CardRate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rate: null,
      isEditTitle: false,
    }
  }

  componentDidMount () {
    const { getRateByID } = this.props;
    const { id } = this.props.match.params;
    this.changeState(id);
  }

  componentDidUpdate (prevProps) {
    const { id } = prevProps.match.params;;
    const { id: nexId } = this.props.match.params;
    if (id !== nexId) {
      this.changeState(id);
    }
  }

  changeState = (id) => {
    const { getRateByID } = this.props;
    isFunction(getRateByID)
    && getRateByID(id).then((res) => {
      if (res.response) {
        this.setState({ rate: res.response });
      }
    });
  }

  onChangeRate = (event) => {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;
    this.setState((prevState) => ({
      rate: {
        ...prevState.rate,
        [name]: value
      },
    }));
  }

  changeStateParty = (party, event) => {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;
    const { id } = event.currentTarget.dataset;
    return party && party.map((itm) => {
      if (itm._id === id) {
        itm[name] = value;
      }
      return itm;
    })
  }

  onChangeParticipator = (event) => {
    const { rate } = this.state;
    let newRate = {
      ...rate,
      party: this.changeStateParty(rate.party, event)
    };
    this.setState({
      rate: newRate
    });
  }

  handleIsEditTitle = () => {
    this.setState((prevState) => ({
      isEditTitle: !prevState.isEditTitle,
    }))
  }

  render() {
    const {
      rate,
      // isEditTitle
    } = this.state;
    return (
      <Layout>
        <div className="card-rate">
          {
            rate &&
            <form className="card-rate__form">
              <div className="card-rate__header">
                {
                  // !isEditTitle &&
                  <span onDoubleClick={this.handleIsEditTitle}>{rate.title}</span>
                }
                {
                  // isEditTitle &&
                  // <input
                  //   value={rate.title}
                  //   onChange={this.onChangeRate}
                  //   className="card-rate__title"
                  //   type="text"
                  //   name="title"
                  // >
                  // </input>
                }
              </div>
              <div className="card-rate__content">
                <span>Описание</span>
                <div>
                  <textarea
                    rows="10"
                    cols="500"
                    name="description"
                    className="card-rate__description"
                    value={rate.description}
                    onChange={this.onChangeRate}
                  >
                  </textarea>
                </div>
              </div>
              {
                rate.party &&
                <Party
                  party={rate.party}
                  onChangeParticipator={this.onChangeParticipator}
                />
              }
              <div className="card-rate__footer">
                <div className="card-rate_date">
                  <span>{`Дата создание: ${rate.localTime}`}</span>
                </div>
                <div className="card-rate_date">
                  <span>{`Дата началы: ${rate.dateStart}`}</span>
                </div>
                <div className="card-rate_date">
                  <span>{`Дата оканичание: ${rate.dateFinish}`}</span>
                </div>
              </div>
            </form>
          }
        </div>
      </Layout>
    );
  }
}

CardRate.propType = {
  getRateByID: PropTypes.func,
  rate: PropTypes.shape({}),
}

const mapStateToprops = ({
  rate
}) => ({
  rate: rate.selectRate,
})

export default connect(mapStateToprops, {
  getRateByID,
})(CardRate);
