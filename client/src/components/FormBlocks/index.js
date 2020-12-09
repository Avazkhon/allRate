import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  List,
  ListItem,
  Grid,
  Icon,
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import {
  Form,
  // Button,
} from 'react-bootstrap';

import FormBlock from '../FormBlock';

import style from './style';

import {
  postBlock,
} from 'actions';

const textLang = {
  title: {
    EN: 'Title',
    RU: 'Заголовок'
  },
  description: {
    EN: 'Description',
    RU: 'Описания'
  },
  type: {
    EN: 'Type',
    RU: 'Тип'
  },
  conditions: {
    EN: 'Conditions',
    RU: 'Условия'
  },
  yes: {
    EN: 'Yes',
    RU: 'Да'
  },
  no: {
    EN: 'No',
    RU: 'Нет'
  }
}

const betTemplate = {
  id: 0,
  condition: "",
  participants: []
}

const blockTemplate = {
  id: 1,
  title: {
    value: "",
    templateId: null
  },
  description: {
    value: "",
    templateId: null
  },
  type: "boolean",
  bets: []
}

// import {
// } from 'utils';

import {
  typeBlock
} from '../../constants';

// import Messages from 'components/Messages';

class FormBlocks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      block: [],
    }
  }

  handlePostBlock = () => {
    const {
      data
    } = this.state;

    const {
      postBlock
    } = this.props;

    postBlock(data, '5fc7c00d8db8b13ca0a60023')
      .then((action) => {
        console.log(action);
      })
  }

  addBlock = () => {
    const {
      block
    } = this.state;

    block.push({...blockTemplate, id: blockTemplate.id + block.length })
    this.setState({block})
  }

  render() {
    const {
      block,
    } = this.state;

    const {
      classes,
      lang,
    } = this.props

    console.log(block);
    return (
      <div className={classes['card-block']} noValidate autoComplete="off">
        {
          block.map((bets) => {
            return (
              <FormBlock bets={bets} key={bets.id} />
            )
          })
        }
        <div>
          <Button variant="contained" onClick={this.addBlock} color="primary">
            <AddCircleIcon />
          </Button>
        </div>
      </div>
    );
  }
}

FormBlocks.propTypes = {
  auth: PropTypes.shape(),
  classes: PropTypes.shape(),
  postBlock: PropTypes.func,
}

function mapStateToProps(state) {
  const {
    auth,
    lang,
  } = state;
  return {
    auth,
    lang: lang.lang,
  };
}

export default injectSheet(style)(
  connect(
    mapStateToProps,
    {
      postBlock
    }
  )(FormBlocks)
)
