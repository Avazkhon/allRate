import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './style.css';

import Party from './components/Party';

import Layout from '../layout';

import {
  getRateByID,
} from '../../actions';

import {
  isFunction,
} from '../../utils';

class CardRate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      // isEditTitle: false,
      isEdit: false,
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
        this.setState({ data: res.response });
      }
    });
  }

  resetState = () => {
    const { rate } = this.props;
    this.setState({
      data: rate
    });
    this.handleIsEdit();
  }

  onChangeRate = (event) => {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;
    this.setState((prevState) => ({
      data: {
        ...prevState.data,
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
    const { data } = this.state;
    // NOTE: props меняеться во время изменения state
    console.log(333, this.props.rate);
    console.log(111, this.changeStateParty(data.party, event));
    this.setState({
      data: {
        ...data,
        party: this.changeStateParty(data.party, event)
      }
    });
  }

  handleIsEditTitle = () => {
    this.setState((prevState) => ({
      isEditTitle: !prevState.isEditTitle,
    }));
  }

  handleIsEdit = () => {
    this.setState((prevState) => ({
      isEdit: !prevState.isEdit,
    }));
  }

  render() {
    const {
      data,
      // isEditTitle
      isEdit,
    } = this.state;

    return (
      <Layout>
        <div className="card-rate">
          {
            data &&
            <form className="card-rate__form">
              <div className="card-rate__header">
                {
                  // !isEditTitle &&
                  <span onDoubleClick={this.handleIsEditTitle}>{data.title}</span>
                }
                {
                  // isEditTitle &&
                  // <input
                  //   value={data.title}
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
                    value={data.description}
                    onChange={this.onChangeRate}
                  >
                  </textarea>
                </div>

                {
                  data.party &&
                  <Party
                    party={data.party}
                    onChangeParticipator={this.onChangeParticipator}
                  />
                }

                <div className="card-rate__dates">
                  <div className="card-rate_date">
                    <span>{`Дата создание: ${data.localTime}`}</span>
                  </div>
                  <div className="card-rate_date">
                    <span>{`Дата началы: ${data.dateStart}`}</span>
                  </div>
                  <div className="card-rate_date">
                    <span>{`Дата оканичание: ${data.dateFinish}`}</span>
                  </div>
                </div>

              </div>
              <div className="card-rate__footer">
                {
                  !isEdit &&
                  <input
                    type="button"
                    value='Изменить'
                    onClick={this.handleIsEdit}
                  />
                }
                {
                  isEdit &&
                  <input
                    type="button"
                    value='отмена'
                    onClick={this.resetState}
                  />
                }
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
