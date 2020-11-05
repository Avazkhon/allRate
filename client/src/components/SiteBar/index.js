import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import injectSheet from 'react-jss';

import style from './style';


const Sitebar = ({
  classes,
  userData,
}) => (
  <div className={classes['sitebar']}>
    <aside className={classes['sitebar-links']}>
      { userData && userData._id &&
        <>
          <p className={classes['sitebar-link']}><Link to='/create-rate'><span>Создать ставку</span></Link></p>
          <p className={classes['sitebar-link']}><Link to={`/rate-list?page=1&limit=24&authorId=${userData._id}`}><span>Созданные ставки</span></Link></p>
        </>
      }
      {
        userData && userData.isAdmin &&
        <p className={classes['sitebar-link']}><Link to='/admin/withdrawal-request'><span>Запросы на переводы</span></Link></p>
      }
      <p className={classes['sitebar-link']}><Link to='/rate-list?page=1&limit=24'><span>Список ставок</span></Link></p>
      <p className={classes['sitebar-link']}><Link to='/users/?page=1&limit=24'><span>Люди</span></Link></p>
    </aside>
  </div>
)

Sitebar.propTypes = {
  classes: PropTypes.shape(),
  userData: PropTypes.shape(),
}

export default injectSheet(style)(Sitebar);
