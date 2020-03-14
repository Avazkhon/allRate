import React from 'react';
import injectSheet from 'react-jss';

import style from'./style';

class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      classes,
    } = this.props;
    return (
      <footer className="footer">
        <div className={classes['footer-content']}>
          Footer
        </div>
      </footer>
    );
  }
}

export default injectSheet(style)(Footer);
