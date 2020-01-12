import React from 'react';

import Auth from '../../components/auth'

import './style.css';

class PageAuth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        email: '',
        password: '',
      }
    }
  }

  // componentDidMount() {
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

  render() {
    return (
      <div className="page-auth">
        <div className="page-auth__connect">
          <Auth
            handleChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}

export default PageAuth;
