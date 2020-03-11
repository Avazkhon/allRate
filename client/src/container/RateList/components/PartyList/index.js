import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

import style from './style';

class PartyList extends React.Component {
  // constructor(props) {
  //   super(props);
  //
  // }


  render() {
    const {
      party,
      classes,
    } = this.props;
    return (
      <div className={classes['party-items']}>
        <div><span>Список участников</span></div>
        <div>
          <ul>
            {
              party.map((itm) => {
                return (
                  <li
                    key={itm._id}
                    className={classes['party-items_item']}
                  >
                    <div className={classes['party-items_item-header']}>
                      <span>{itm.participator}</span>
                    </div>
                    <div className={classes['party-items_item-description']}>
                      <div className={classes['party-items_item-description-text']}>
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
  party: PropTypes.shape({}),
  classes: PropTypes.shape({
    _id: PropTypes.string,
    participator: PropTypes.string,
    description: PropTypes.string,
  })
}

export default injectSheet(style)(PartyList);
