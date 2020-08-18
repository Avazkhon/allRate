import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import injectSheet from 'react-jss';

import style from './style';


const Sitebar = ({
  classes,
  userId,
}) => (
  <div className={classes['sitebar']}>
    <aside className={classes['sitebar-links']}>
      { userId &&
        <p className={classes['sitebar-link']}><Link to='/create-rate'><span>Создать ставку</span></Link></p>
      }
      {
        userId &&
        <p className={classes['sitebar-link']}><Link to={`/rate-list?page=1&limit=24&authorId=${userId}`}><span>Созданные ставки</span></Link></p>
      }
      <p className={classes['sitebar-link']}><Link to='/rate-list?page=1&limit=24'><span>Список ставок</span></Link></p>
      <p className={classes['sitebar-link']}><Link to='/users/?page=1&limit=24'><span>Люди</span></Link></p>
    </aside>
  </div>
)

Sitebar.propTypes = {
  classes: PropTypes.shape(),
  userId: PropTypes.string,
}

export default injectSheet(style)(Sitebar);
