import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

class PartyList extends React.Component {
  // constructor(props) {
  //   super(props);
  //
  // }


  render() {
    const {
      party,
    } = this.props;
    return (
      <div className="rate-item_party">
        <div><span>Список участников</span></div>
        <div>
          <ul>
            {
              party.map((itm) => {
                return (
                  <li
                    key={itm._id}
                    className="item-party"
                  >
                    <div className="item-party_header">
                      <span>{rate.title}</span>
                    </div>
                    <div className="item-party_description">
                      <div className="item-party_description-text">
                        <p>{rate.description}</p>
                      </div>
                    </div>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    );
  }
}

PartyList.propType = {
  party: PropTypes.shape({})
}

export default PartyList;
