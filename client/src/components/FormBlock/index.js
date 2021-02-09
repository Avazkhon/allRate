import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import {
  Button,
  TextField,
  FormControl,
  Select,
  List,
  ListItem,
  Grid,
  Popover,
  ListItemText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';


import style from './style';

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
  options: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  optionsOpenBtn: {
    marginLeft: 10,
  }
}));

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

function FormBlock({
  classes: oldClasses,
  lang,
  block: {
    type,
    title,
    description,
    status,
    bets,
    id: idBlock,
  },
  addBets,
  selectWinBet,

  handleChangeTextBlock,
  handleChangeTextBets,
  changeStatusBlock,
  deleteBlock,
  deleteBets,
  changeTypeBlock,
  isDisabledByLife,
  statusLife,
}){
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null)
  const handleOpenOption = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOpenClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  function renderBoolType (bets) {

    return (
      <List component="nav" className={oldClasses.root} aria-label="contacts">
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
                      value={bet.condition}
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
                      disabled={statusLife === rateStatusLive.archive || isSelectWin || !bet.status}
                    >
                      {textLang.no[lang]}
                    </Button>
                    <Button
                      variant="contained"
                      onClick={selectWinBet}
                      data-idblock={idBlock}
                      data-idbet={bet.id}
                      data-no_or_yes={true}
                      disabled={statusLife === rateStatusLive.archive || isSelectWin || !bet.status}
                      >
                        {textLang.yes[lang]}
                    </Button>
                    {
                      !bet.amount &&
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

  function renderTotalType (bets) {
    const isSelectWin = bets.some(bet => bet.win)
    return (
      <List component="nav" className={oldClasses.root} aria-label="contacts">
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
                      value={bet.condition}
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
                      disabled={statusLife === rateStatusLive.archive || isSelectWin || !status}
                      >
                        {textLang.yes[lang]}
                      </Button>
                      {
                        !bet.amount &&
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

    return (
      <form className={oldClasses['card-block']} noValidate autoComplete="off">
        <div>
          <TextField
            name="title"
            label={textLang.title[lang]}
            id="standard-password-input"
            value={title.value}
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
            value={description.value}
            onChange={handleChangeTextBlock}
            inputProps={{
              'data-idblock': idBlock
            }}
            disabled={isDisabledByLife}
            required
          />
          <FormControl className={oldClasses.formControl}>
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
              type === typeBlock.boolean && renderBoolType(bets)
            }
            {
              type === typeBlock.total && renderTotalType(bets)
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
        <>
          <FormatListBulletedIcon
            className={classes.optionsOpenBtn}
            coloe="primary"
            aria-describedby={id}
            variant="contained"
            color="primary" onClick={handleOpenOption}
          />
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleOpenClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
          <List component="nav" className={classes.options} aria-label="mailbox folders">

           {
             statusLife === rateStatusLive.new &&
             <ListItem
              button
              variant="contained"
              color="secondary"
              data-idblock={idBlock}
              onClick={deleteBlock}
             >
              <DeleteIcon />
               <ListItemText primary="Удалить" />
             </ListItem>
           }

           {
             ((statusLife === rateStatusLive.finish) || (statusLife === rateStatusLive.archive)) &&
             (type === typeBlock.total) &&
             <ListItem
              button
              variant="contained"
              color="secondary"
              data-idblock={idBlock}
              onClick={changeStatusBlock}
             >
              <DeleteIcon />
               <ListItemText primary={ status ? 'Не состоявшийся' : 'состоявшийся' } />
             </ListItem>
           }
         </List>
          </Popover>
        </>
      </form>
    );
}

FormBlock.propTypes = {
  // auth: PropTypes.shape(),
  classes: PropTypes.shape(),
  block: PropTypes.shape(),
  lang: PropTypes.shape(),
  addBets: PropTypes.func,
  handleChangeTextBlock: PropTypes.func,
  handleChangeTextBets: PropTypes.func,
  changeStatusBlock: PropTypes.func,
  deleteBlock: PropTypes.func,
  deleteBets: PropTypes.func,
  changeTypeBlock: PropTypes.func,
  selectWinBet: PropTypes.func,
  isDisabledByLife: PropTypes.bool,
  statusLife: PropTypes.string,
}

export default injectSheet(style)(FormBlock)
