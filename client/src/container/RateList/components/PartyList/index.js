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
      <div className="party-items">
        <div><span>Список участников</span></div>
        <div>
          <ul>
            {
              party.map((itm) => {
                return (
                  <li
                    key={itm._id}
                    className="party-items_item"
                  >
                    <div className="party-items_item-header">
                      <span>{itm.participator}</span>
                    </div>
                    <div className="party-items_item-description">
                      <div className="party-items_item-description-text">
                        <p>{itm.description}</p>
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
