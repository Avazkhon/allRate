import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Link } from "react-router-dom";

import './style.css';

const navBar = [
  { id: 1, name: 'Главная', url: '/'},
  { id: 3, name: 'Моя стриница', url: '/me'},
  { id: 4, name: 'Помощь', url: '/help'},
  { id: 5, name: 'Логин', url: '/auth'},
]

class Header extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div className="header">
        <ul className="header__navbar">
          {navBar.map((itm) => {
            return (
              <li key={itm.id} className="header__item">
                <Link to={itm.url} style={{ 'text-decoration': 'none' }}>
                  <span>{itm.name}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    );
  }
}

Header.propType = {
}

function mapStateToProps(state) {
  const {
    auth,
  } = state;
  return {
    auth,
  };
}

export default connect(mapStateToProps, {
})(Header);
