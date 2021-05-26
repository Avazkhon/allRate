import React, { Component } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

import Messages from 'components/Messages';

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

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    border: '1px solid red',
  }),
}

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
      valid: {},
      isFetching: false,
      error: '',
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
    });
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

  validateEmail = (email) => {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
  }

  checkLength = (string, length, warning) => (string.length < length && warning);

  checkValidPhone = (phone) => {
    const re = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
    return re.test(String(phone).toLowerCase());
  }

  checkValid = () => {
    const { data } = this.state;
    const status = {
      email: !this.validateEmail(data.email) && 'не коректно заполнено поле',
      password: this.checkLength(data.password, 6, 'не коректно заполнено поле'),
      userName: this.checkLength(data.userName, 2, 'не коректно заполнено поле'),
      phone: !this.checkValidPhone(data.phone) && 'не коректно заполнено поле',
      month: this.checkLength(data.age.month, 1, 'не заполненно'),
      day: this.checkLength(data.age.day, 1, 'не заполненно'),
      year: this.checkLength(data.age.year, 1, 'не заполненно'),
    };
    this.setState({ valid: status });
    return Object.values(status).some(status => typeof status === 'string');
  }

  handleSubmitCreateNewUser = () => {
    const {
      data,
    } = this.state;
    data.dateCreate = new Date;
    const {
      createNewUser,
      handleCreateNewUser,
    } = this.props;
    this.setState({
      isFetching: true,
      error: '',
    });
    if (!this.checkValid()) {
      createNewUser(data)
      .then((action) => {
        if (action.status === 'SUCCESS') {
          this.setState({
            isFetching: false,
          })
          handleCreateNewUser();
        } else {
          this.setState({
            isFetching: false,
            error: action.error,
          })
        }
      });
    } else {
      this.setState({
        isFetching: false,
        error: 'Не все поля заполнены',
      })
    }
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
      },
      valid,
      isFetching,
      error,
    } = this.state;

    return(
      <div
        className="login"
      >
        <form className="login_form">
          <div className="login_title" >Регистрация</div>
          <div>
            <label className="login__label">
              <span className="login__label-value">Электронная почта {valid.email && <span className="login__label-error">{valid.email}</span>}</span>
              <input
                value={email}
                onChange={this.handleChange}
                placeholder="Введите электронная почту"
                className="login__input"
                type="email"
                name="email"
              >
              </input>
            </label>

            <label className="login__label">
              <span className="login__label-value">Моб.телефон {valid.phone && <span className="login__label-error">{valid.phone}</span>}</span>
              <input
                value={phone}
                onChange={this.handleChange}
                placeholder="Введите мобильный телефон"
                className="login__input"
                type="text"
                name="phone"
              >
              </input>
            </label>

            <label className="login__label">
              <span className="login__label-value">Пароль {valid.password && <span className="login__label-error">{valid.password}</span>}</span>
              <input
                value={password}
                onChange={this.handleChange}
                placeholder="Введите пароль"
                className="login__input"
                type="password"
                name="password"
              >
              </input>
            </label>

            <label className="login__label">
              <span className="login__label-value">Имя {valid.userName && <span className="login__label-error">{valid.userName}</span>}</span>
              <input
                value={userName}
                onChange={this.handleChange}
                placeholder="Введите имя"
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
                    styles={valid.day && customStyles}
                    placeholder="Выбрать"
                    value={{ ...optionsDay.find(option => option.value === day) }}
                    onChange={this.handleChangeDay}
                    options={optionsDay}
                  />
              </label>
              <label className="login__label">
                <span className="login__label-value">Месяц</span>
                <Select
                  styles={valid.month && customStyles}
                  placeholder="Выбрать"
                  value={{ ...optionsMonth.find(option => option.value === month) }}
                  onChange={this.handleChangeMonth}
                  options={optionsMonth}
                />
              </label>
              <label className="login__label">
                <span className="login__label-value">Год</span>
                <Select
                  styles={valid.year && customStyles}
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
              value="Зарегистрироваться"
              disabled={isFetching}
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
        <Messages
          isFetching={isFetching}
          error={error}
        />
      </div>
    )
  }
}

CreateNewUser.propTypes = {
  createNewUser: PropTypes.func,
  handleCreateNewUser: PropTypes.func,
  handleReturnLogin: PropTypes.func,
}

export default CreateNewUser;
