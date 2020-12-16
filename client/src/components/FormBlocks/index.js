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
  typeBlock,
} from '../../constants';

import {
  postBlock,
  getBlockById,
  putBlockById,
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
      block: {
        blocks: []
      },
    }
  }

  componentDidUpdate(prevProps){
    const { blockId, getBlockById } = this.props;
    const { blockId: prevtBlockId } = prevProps;
    if(blockId && !prevtBlockId) {
      getBlockById(blockId)
        .then((action) => {
          if (action.status === 'SUCCESS') {
            this.setState({block: action.response})
          }
        })
    }
  }

  randomNumber = (min = 100000, max = 999999) => {
    return Math.floor(Math.random() * (max - min) + min);
  }

  handlePostBlock = () => {
    const {
      block,
    } = this.state;

    const {
      postBlock,
      rateId,
    } = this.props;

    postBlock(block, rateId)
      .then((action) => {
        this.setState({block: action.response})
      })
  }

  handleChangeBlockById = () => {
    const {
      block,
    } = this.state;

    const {
      putBlockById,
    } = this.props;

    putBlockById(block)
      .then((action) => {
        this.setState({block: action.response})
      })
  }

  addBets = (e) => {
    const { idblock } = e.currentTarget.dataset;
    let {
      blocks
    } = this.state.block;
    blocks = blocks.map((block) => {
      if (block.id === Number(idblock)) {
        const betTemplate = {
          id: this.randomNumber(),
          condition: "",
          participants: []
        }
        block.bets.push(betTemplate)
      }
      return block;
    })

    this.setState((prevState) => ({
      block: {
        ...prevState.block,
        blocks,
      }
    }))
  }

  addBlock = () => {
    const {
      block
    } = this.state;

    const blockTemplate = {
      id: this.randomNumber(),
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

    block.blocks.push(blockTemplate)
    this.setState({block})
  }

  handleChangeTextBets = (e) => {
    const { idblock, idbet } = e.currentTarget.dataset;
    const { value, name } = e.currentTarget;
    let { blocks } = this.state.block;
    blocks = blocks.map((block) => {
      if (block.id === Number(idblock)) {
        block.bets.map((bet) => {
          if (bet.id === Number(idbet)) {
            bet[name] = value;
          }
          return bet;
        })
      }
      return block;
    })
    this.setState((prevState) => ({
      block: {
        ...prevState.block,
        blocks,
      }
    }))
  }

  handleChangeTextBlock = (e) => {
    const { idblock } = e.currentTarget.dataset;
    const { value, name } = e.currentTarget;
    let { blocks } = this.state.block;

    blocks = blocks.map((block) => {
      if (block.id === Number(idblock)) {
        block[name].value = value;
      }
      return block;
    })

    this.setState((prevState) => ({
      block: {
        ...prevState.block,
        blocks,
      }
    }))
  }

  deleteBlock = (e) => {
    const { idblock } = e.currentTarget.dataset;
    const { block } = this.state;
    block.blocks = block.blocks.filter(block => block.id !== Number(idblock));
    this.setState({block})
  }

  deleteBets = (e) => {
    const { idblock, idbet } = e.currentTarget.dataset;
    const { block } = this.state;
    block.blocks.map((block) => {
      if(block.id === Number(idblock)) {
        block.bets = block.bets.filter(bet => bet.id !== Number(idbet))
      }
      return block;
    })

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
          block.blocks.map((block) => {
            return (
              <FormBlock
                block={block}
                key={block.id}
                addBets={this.addBets}
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
            <AddCircleIcon /> Добавить блок
          </Button>
          <Button
            variant="contained"
            onClick={block._id ? this.handleChangeBlockById : this.handlePostBlock}
            color="primary"
          >
            <AddCircleIcon /> { block._id ? 'Обновить блоки' : 'Сохранить' }
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
  getBlockById: PropTypes.func,
  putBlockById: PropTypes.func,
  rateId: PropTypes.string,
  blockId: PropTypes.string,
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
      postBlock,
      getBlockById,
      putBlockById,
    }
  )(FormBlocks)
)
