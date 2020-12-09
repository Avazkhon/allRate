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

import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import {
  Form,
  // Button,
} from 'react-bootstrap';

import style from './style';

import FormBlock from '../FormBlock';


import {
  typeBlock
} from '../../constants';

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

// import {
// } from 'utils';

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

  addBets = (e) => {
    const indexBlock = e.currentTarget.name;
    let {
      block
    } = this.state;
    const betTemplate = {
      id: block[indexBlock].bets.length + 1,
      condition: "",
      participants: []
    }
    block[indexBlock].bets.push(betTemplate);
    this.setState({
      block: [...block]
    })
  }

  addBlock = () => {
    const {
      block
    } = this.state;

    const blockTemplate = {
      _id: block.length + 1,
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

    block.push(blockTemplate)
    this.setState({block})
  }

  handleChangeTextBets = (e) => {
    const { index, betindex } = e.currentTarget.dataset;
    const { value, name } = e.currentTarget;
    const { block } = this.state;
    block[index].bets[betindex][name] = value;
    this.setState({block})
  }

  handleChangeTextBlock = (e) => {
    const { index } = e.currentTarget.dataset;
    const { value, name } = e.currentTarget;
    const { block } = this.state;
    block[index][name].value = value;
    this.setState({block})
  }

  deleteBlock = (e) => {
    const { index } = e.currentTarget.dataset;
    const { block } = this.state;
    block.splice(index, 1);
    this.setState({block})
  }

  deleteBets = (e) => {
    const { index, betindex } = e.currentTarget.dataset;
    const { block } = this.state;
    block[index].bets.splice(betindex, 1)
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

    return (
      <div className={classes['card-block']} noValidate autoComplete="off">
        {
          block.map((bets, indexBlock) => {
            return (
              <FormBlock
                bets={bets}
                key={bets._id}
                addBets={this.addBets}
                indexBlock={indexBlock}
                handleChangeTextBlock={this.handleChangeTextBlock}
                handleChangeTextBets={this.handleChangeTextBets}
                deleteBlock={this.deleteBlock}
                deleteBets={this.deleteBets}
                lang={lang}
              />
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
