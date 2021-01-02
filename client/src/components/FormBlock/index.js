import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import {
  Button,
  TextField,
  FormControl,
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

import {
  typeBlock,
  rateStatusLive,
} from '../../constants';

// import Messages from 'components/Messages';

class FormBlock extends React.Component {
  constructor(props) {
    super(props);
  }

  renderBoolType = (bets) => {
    const {
      lang,
      classes,
      handleChangeTextBets,
      deleteBets,
      block: {
        id: idBlock
      },
      isDisabledByLife,
      selectWinBet,
      statusLife,
    } = this.props;
    const isFinish = !statusLife || statusLife === rateStatusLive.finish;
    console.log(isFinish);
    return (
      <List component="nav" className={classes.root} aria-label="contacts">
        {
          bets.map((bet) => {
            const isSelectWin = typeof bet.noOrYes === 'boolean';

            return (
              <ListItem button key={bet.id}>
                <Grid container>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="condition"
                      label={textLang.conditions[lang]}
                      id="standard-password-input"
                      defaultValue={bet.condition}
                      inputProps={{
                        'data-idblock': idBlock,
                        'data-idbet': bet.id,
                      }}
                      onChange={handleChangeTextBets}
                      disabled={isDisabledByLife}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Button
                      variant="contained"
                      onClick={selectWinBet}
                      data-idblock={idBlock}
                      data-idbet={bet.id}
                      data-no_or_yes={false}
                      disabled={isFinish || isSelectWin}
                    >
                      {textLang.no[lang]}
                    </Button>
                    <Button
                      variant="contained"
                      onClick={selectWinBet}
                      data-idblock={idBlock}
                      data-idbet={bet.id}
                      data-no_or_yes={true}
                      disabled={isFinish || isSelectWin}
                      >
                        {textLang.yes[lang]}
                    </Button>
                    {
                      !bet.participants.length &&
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={deleteBets}
                        data-idblock={idBlock}
                        data-idbet={bet.id}
                        disabled={isDisabledByLife}
                      ><DeleteIcon /></Button>
                    }
                  </Grid>
                </Grid>
              </ListItem>
            )
          })
        }
      </List>
    )
  }

  renderTotalType = (bets) => {
    const {
      lang,
      classes,
      handleChangeTextBets,
      deleteBets,
      block: {
        id: idBlock,
        win,
      },
      isDisabledByLife,
      selectWinBet,
      statusLife,
    } = this.props;
      const isHasPatricpants = bets.some(bet => bet.participants.length)
      const isSelectWin = bets.some(bet => bet.win)
      const isFinish = !statusLife || statusLife === rateStatusLive.finish;
    return (
      <List component="nav" className={classes.root} aria-label="contacts">
        {
          bets.map((bet) => {
            return (
              <ListItem button key={bet.id}>
                <Grid container>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="condition"
                      label={textLang.conditions[lang]}
                      id="standard-password-input"
                      defaultValue={bet.condition}
                      inputProps={{
                        'data-idblock': idBlock,
                        'data-idbet': bet.id,
                      }}
                      onChange={handleChangeTextBets}
                      disabled={isDisabledByLife}
                      required
                    />
                </Grid>
                  <Grid item xs={12} sm={6}>
                    <Button
                      variant="contained"
                      onClick={selectWinBet}
                      data-idblock={idBlock}
                      data-idbet={bet.id}
                      disabled={isFinish || isSelectWin}
                      >
                        {textLang.yes[lang]}
                      </Button>
                      {
                        !isHasPatricpants &&
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={deleteBets}
                          data-idblock={idBlock}
                          data-idbet={bet.id}
                          disabled={isDisabledByLife}
                          >
                          <DeleteIcon />
                        </Button>
                      }
                  </Grid>
                </Grid>
              </ListItem>
            )
          })
        }
      </List>
    )
  }

  render() {
    const {
      classes,
      lang,
      block: {
        type,
        title,
        description,
        bets,
        id: idBlock,
      },
      addBets,

      handleChangeTextBlock,
      deleteBlock,
      changeTypeBlock,
      isDisabledByLife,
      statusLife,
    } = this.props;

    return (
      <form className={classes['card-block']} noValidate autoComplete="off">
        <div>
          <TextField
            name="title"
            label={textLang.title[lang]}
            id="standard-password-input"
            defaultValue={title.value}
            onChange={handleChangeTextBlock}
            inputProps={{
              'data-idblock': idBlock
            }}
            disabled={isDisabledByLife}
            required
          />
          <TextField
            name="description"
            label={textLang.description[lang]}
            defaultValue={description.value}
            onChange={handleChangeTextBlock}
            inputProps={{
              'data-idblock': idBlock
            }}
            disabled={isDisabledByLife}
            required
          />
          <FormControl className={classes.formControl}>
            {textLang.type[lang]}
            <Select
              native
              value={type}
              onChange={changeTypeBlock}
              inputProps={{
                'data-idblock': idBlock,
              }}
              disabled={isDisabledByLife}
            >
              {
                Object.keys(typeBlock).map((key) => {
                  return (
                    <option
                      value={typeBlock[key]}
                      key={typeBlock[key]}
                    >
                      {typeBlock[key]}
                    </option>
                  )
                })
              }
            </Select>
          </FormControl>
          <div>
            {
              type === typeBlock.boolean && this.renderBoolType(bets)
            }
            {
              type === typeBlock.total && this.renderTotalType(bets)
            }
          </div>
        </div>
        { (!statusLife || (statusLife === rateStatusLive.new)) &&
          <Button
            variant="contained"
            color="primary"
            data-idblock={idBlock}
            onClick={addBets}
          >
            <AddCircleIcon />
          </Button>
        }
        {
          statusLife === rateStatusLive.new &&
          <Button
            variant="contained"
            color="secondary"
            data-idblock={idBlock}
            onClick={deleteBlock}
          >
            <DeleteIcon />
          </Button>
        }
      </form>
    );
  }
}

FormBlock.propTypes = {
  // auth: PropTypes.shape(),
  classes: PropTypes.shape(),
  block: PropTypes.shape(),
  addBets: PropTypes.func,
  handleChangeTextBlock: PropTypes.func,
  handleChangeTextBets: PropTypes.func,
  deleteBlock: PropTypes.func,
  deleteBets: PropTypes.func,
  changeTypeBlock: PropTypes.func,
  selectWinBet: PropTypes.func,
  isDisabledByLife: PropTypes.bool,
  statusLife: PropTypes.string,
}

// function mapStateToProps(state) {
//   const {
//     auth,
//     lang,
//   } = state;
//   return {
//     auth,
//     lang: lang.lang,
//   };
// }

export default injectSheet(style)(FormBlock)
// export default injectSheet(style)(
//   connect(
//     mapStateToProps,
//     {
//
//     }
//   )(FormBlock)
// )
