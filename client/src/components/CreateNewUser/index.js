import React, { Component } from 'react';
import Select from 'react-select';

import PropTypes from 'prop-types';

import './style.css';

const optionsMonth = [
  { value: 'January', label: 'январь' },
  { value: 'February', label: 'февраль' },
  { value: 'March', label: 'март' },
  { value: 'April', label: 'апрель' },
  { value: 'May', label: 'май' },
  { value: 'June', label: 'июнь' },
  { value: 'July', label: 'июль' },
  { value: 'August', label: 'август' },
  { value: 'September', label: 'сентябрь' },
  { value: 'October', label: 'октябрь' },
  { value: 'November', label: 'ноябрь' },
  { value: 'December', label: 'декабрь' },
];

const optionsDay = (() => {
  const day = [];
  for (var i = 1; i <= 31; i++) {
    day.push({ value: i, label: i });
  }
  return day;
})()

const optionsYear = (() => {
  const year = [];
  const itYear = new Date().getFullYear();
  for (var i = itYear - 18; i >= itYear - 100; i--) {
    year.push({ value: i, label: i });
  }
  return year;
})();

class CreateNewUser extends Component {
  constructor(props) {
		super(props);
		this.state = {
      data: {
        email: '',
        password: '',
        userName: '',
        phone: '',
        age: {
          month: '',
          day: '',
          year: '',
        }
      },
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

  handleChangeDay = day => {
    this.setState((prevState) => {
      return {
        data: {
          ...prevState.data,
          age: {
            ...prevState.data.age,
            day: day.value
          }
        }
      }
    });
  };

  handleChangeMonth = month => {
    this.setState((prevState) => {
      return {
        data: {
          ...prevState.data,
          age: {
            ...prevState.data.age,
            month: month.value
          }
        }
      }
    });
  };

  handleChangeYear = year => {
    this.setState((prevState) => {
      return {
        data: {
          ...prevState.data,
          age: {
            ...prevState.data.age,
            year: year.value
          }
        }
      }
    });
  };

  handleSubmitCreateNewUser = () => {
    const {
      data,
    } = this.state;
    data.dateCreate = new Date;
    const {
      createNewUser,
      handleCreateNewUser,
    } = this.props;
    createNewUser(data)
    .then((action) => {
      if (action.response) {
        handleCreateNewUser();
      }
    });
  }

  render() {
    const {
      handleReturnLogin,
    } = this.props;

    const {
      data: {
        age: {
          month,
          day,
          year,
        },
        email,
        password,
        userName,
        phone,
      }

    } = this.state;

    return(
      <div
        className="login"
      >
        <form className="login_form">
          <div className="login_title" >Регистрация</div>
          <div>
            <label className="login__label">
              <span className="login__label-value">Электронная почта</span>
              <input
                value={email}
                onChange={this.handleChange}
                placeholder="Ввидите электронная почту"
                className="login__input"
                type="email"
                name="email"
              >
              </input>
            </label>

            <label className="login__label">
                <span className="login__label-value">Моб.телефон</span>
              <input
                value={phone}
                onChange={this.handleChange}
                placeholder="Ввидите мобильный телефон"
                className="login__input"
                type="text"
                name="phone"
              >
              </input>
            </label>

            <label className="login__label">
              <span className="login__label-value">Пароль</span>
              <input
                value={password}
                onChange={this.handleChange}
                placeholder="Ввидите пароль"
                className="login__input"
                type="password"
                name="password"
              >
              </input>
            </label>

            <label className="login__label">
              <span className="login__label-value">Имя</span>
              <input
                value={userName}
                onChange={this.handleChange}
                placeholder="Ввидите имя"
                className="login__input"
                type="text"
                name="userName"
              >
              </input>
            </label>

            <div className="login__age">
              <label className="login__label">
                <span className="login__label-value">День</span>
                  <Select
                    placeholder="Выбрать"
                    value={{ ...optionsDay.find(option => option.value === day) }}
                    onChange={this.handleChangeDay}
                    options={optionsDay}
                  />
              </label>
              <label className="login__label">
                <span className="login__label-value">Месяц</span>
                <Select
                  placeholder="Выбрать"
                  value={{ ...optionsMonth.find(option => option.value === month) }}
                  onChange={this.handleChangeMonth}
                  options={optionsMonth}
                />
              </label>
              <label className="login__label">
                <span className="login__label-value">Год</span>
                <Select
                  placeholder="Выбрать"
                  value={{ ...optionsYear.find(option => option.value === year) }}
                  onChange={this.handleChangeYear}
                  options={optionsYear}
                />
              </label>
            </div>
          </div>
          <div className="login__btn-group">
            <input
              className="login__btn"
              type="button"
              value="Зарегистрирлваться"
              onClick={this.handleSubmitCreateNewUser}
            />
            <input
              className="login__btn"
              type="button"
              value="Войти"
              onClick={handleReturnLogin}
            />
          </div>
        </form>
      </div>
    )
  }
}

CreateNewUser.propType = {
  createNewUser: PropTypes.func,
  handleCreateNewUser: PropTypes.func,
  handleReturnLogin: PropTypes.func,
}

export default CreateNewUser;
