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
} from 'react-bootstrap';

import style from './style';

import FormBlock from '../FormBlock';


import {
  typeBlock,
  rateStatusLive,
} from '../../constants';


import {
  postBlock,
  getBlockById,
  putBlockById,
  patchPartAddBlock,
  postAddBetInBlock,
  deleteBlock,
  deleteBet,
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
        if (action.status === 'SUCCESS') {
          this.setState({block: action.response})
        }
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
        if (action.status === 'SUCCESS') {
          this.setState({block: action.response})
        }
      })
  }

  addBets = (e) => {
    const { idblock } = e.currentTarget.dataset;
    let {
      block
    } = this.state;
    block.blocks.forEach((blockItem) => {
      if (blockItem.id === Number(idblock)) {
        const betTemplate = {
          id: this.randomNumber(),
          condition: "",
          participants: []
        }
        this.props.postAddBetInBlock({ blocksId: block._id, blockId: blockItem._id }, betTemplate)
          .then((action) => {
            if (action.status === 'SUCCESS') {
              this.setState({
                block: action.response
              })
            }
          })
      }
    })
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

    this.props.patchPartAddBlock(block._id, { id: this.randomNumber() })
      .then((action) => {
        if(action.status == 'SUCCESS') {
          block.blocks.push(action.response)
          this.setState({ block })
        }
      })

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
    block.blocks.forEach(blockItem => {
      if (blockItem.id === Number(idblock)) {
        this.props.deleteBlock({ blocksId: block._id, blockId: blockItem._id })
          .then((action) => {
            if (action.status === 'SUCCESS') {
              this.setState({ block: action.response})
            }
          })
      }
    });
  }

  deleteBets = (e) => {
    const { idblock, idbet } = e.currentTarget.dataset;
    const { block } = this.state;

    block.blocks.forEach((blockItem) => {
      if(blockItem.id === Number(idblock)) {
        blockItem.bets.forEach(bet => {
          if (bet.id === Number(idbet)) {
            this.props.deleteBet({ blocksId: block._id, blockId: blockItem._id, betId: bet._id })
              .then((action) => {
                if (action.status === 'SUCCESS') {
                  this.setState({ block: action.response })
                }
              })
          }
        })
      }
    })

  }

  changeTypeBlock = (e) => {
    const { idblock } = e.target.dataset;
    const { value } = e.target;
    const { block } = this.state;
    block.blocks = block.blocks.map(block => {
      if (block.id === Number(idblock)) {
        block.type = value;
      }
      return block;
    });
    this.setState({block})
  }

  selectWinBet = (e) => {
    const {idblock, idbet, no_or_yes } = e.currentTarget.dataset;
    let { block } = this.state;
    const { putBlockById } = this.props;
    block.blocks = block.blocks.map((block) => {
      if (block.id === Number(idblock)) {

        block.bets = block.bets.map((bet) => {
          if (bet.id === Number(idbet)) {
            if (block.type === typeBlock.boolean) {
              bet.noOrYes = no_or_yes;
            }
            if (block.type === typeBlock.total) {
              bet.win = true;
            }
          }
          return bet
        })
      }
      return block
    })
    putBlockById(block)
      .then((action) => {
        if (action.status === 'SUCCESS') {
          this.setState({block: action.response})
        }
      })
  }

  render() {
    const {
      block,
    } = this.state;

    const {
      classes,
      lang,
      statusLife,
    } = this.props;

    const isDisabledByLife = (statusLife === rateStatusLive.finish) ||  (statusLife === rateStatusLive.archive)

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
                changeTypeBlock={this.changeTypeBlock}
                isDisabledByLife={isDisabledByLife}
                selectWinBet={this.selectWinBet}
                statusLife={statusLife}
              />
            )
          })
        }

        <div>
          {
            (!!block._id) &&
            <Button
              variant="contained"
              color="primary"
              onClick={this.addBlock}
              disabled={isDisabledByLife}
            >
              <AddCircleIcon /> Добавить блок
            </Button>
          }

          {
            ((statusLife && !(statusLife === rateStatusLive.archive))) &&
            <Button
              variant="contained"
              color="primary"
              onClick={block._id ? this.handleChangeBlockById : this.handlePostBlock}
            >
              <AddCircleIcon /> { block._id ? 'Обновить блоки' : 'Создать блоки' }
            </Button>
          }
        </div>
      </div>
    );
  }
}

FormBlocks.propTypes = {
  auth: PropTypes.shape(),
  classes: PropTypes.shape(),
  selectRate: PropTypes.shape(),
  postBlock: PropTypes.func,
  getBlockById: PropTypes.func,
  putBlockById: PropTypes.func,
  patchPartAddBlock: PropTypes.func,
  postAddBetInBlock: PropTypes.func,
  deleteBlock: PropTypes.func,
  rateId: PropTypes.string,
  blockId: PropTypes.string,
  statusLife: PropTypes.string,
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
      patchPartAddBlock,
      postAddBetInBlock,
      deleteBlock,
      deleteBet,
    }
  )(FormBlocks)
)
