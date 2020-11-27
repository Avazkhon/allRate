import React from 'react';
import PropTypes from 'prop-types';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

import {
  ListGroup,
} from 'react-bootstrap';

class PersonData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShows: {}
    }
  }

  handleShow = (e) => {
    const { name } = e.currentTarget.dataset;
    this.setState((prevState) => {
      return {
        isShows: {
          ...prevState.isShows,
          [name]: !prevState.isShows[name]
        }
      }
    })
  }
  render() {
    const {
      isShows
    } = this.state;

    const {
      userProps
    } = this.props;

    return (
      <ListGroup>
        {
          userProps.map((itm) => {
            const  isShow = isShows[itm.type];
            let icon = '';
            if (isShow) {
              icon = <AiFillEye/>
            } else {
              icon = <AiFillEyeInvisible/>
            }
            return (
              <ListGroup.Item key={itm.name}>
                {itm.label}{": "}
                {itm.hidden && (
                  <span
                    style={{cursor: 'pointer'}}
                    title={itm.title}
                    data-name={itm.type}
                    onClick={this.handleShow}
                  >
                    {icon}
                  </span>
                )}{" "}
                {(!itm.hidden || isShow) ? itm.name : '........'}
              </ListGroup.Item>
            )
          })
        }
      </ListGroup>
    );
  }
}

PersonData.propTypes = {
  userProps: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      label: PropTypes.string,
      title: PropTypes.string,
      hidden: PropTypes.bool,
    })
  ),
}
export default PersonData;
