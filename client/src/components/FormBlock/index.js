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
  typeBlock
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
      indexBlock,
      handleChangeTextBets,
    } = this.props;
    return (
      <List component="nav" className={classes.root} aria-label="contacts">
        {
          bets.map((bet, betindex) => {
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
                        'data-index': indexBlock,
                        'data-betindex': betindex,
                      }}
                      onChange={handleChangeTextBets}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Button variant="contained" disabled >{textLang.no[lang]}</Button>
                    <Button variant="contained" disabled >{textLang.yes[lang]}</Button>
                    <Button variant="contained" color="secondary"><DeleteIcon /></Button>
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
      indexBlock,
      handleChangeTextBets,
    } = this.props;

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
                        'data-index': indexBlock,
                        'data-betindex': betindex,
                      }}
                      onChange={handleChangeTextBets}
                      required
                    />
                </Grid>
                  <Grid item xs={12} sm={6}>
                    <Button variant="contained" disabled >{textLang.yes[lang]}</Button>
                    <Button variant="contained" color="secondary"><DeleteIcon /></Button>
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
      bets: {
        type,
        title,
        description,
        bets,
        _id
      },
      addBets,
      indexBlock,

      handleChangeTextBlock,
    } = this.props;

    return (
      <form className={classes['card-block']} noValidate autoComplete="off">
        <div>
          <TextField
            name="title"
            label={textLang.title[lang]}
            id="standard-password-input"
            defaultValue={title.value}
            inputProps={{
              'data-index': indexBlock
            }}
            onChange={handleChangeTextBlock}
            required
          />
          <TextField
            name="description"
            label={textLang.description[lang]}
            defaultValue={description.value}
            inputProps={{
              'data-index': indexBlock
            }}
            onChange={handleChangeTextBlock}
            required
          />
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="age-native-simple">{textLang.type[lang]}</InputLabel>
            <Select
              native
              value={type}
              // onChange={handleChange}
              // inputProps={{
              //   name: textLang.type[lang],
              //   id: 'type-native-simple',
              // }}
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
        <Button variant="contained" color="primary"  name={indexBlock} onClick={addBets}>
          <AddCircleIcon>add_circle</AddCircleIcon>
        </Button>
      </form>
    );
  }
}

FormBlock.propTypes = {
  // auth: PropTypes.shape(),
  classes: PropTypes.shape(),
  bets: PropTypes.shape(),
  addBets: PropTypes.func,
  handleChangeTextBlock: PropTypes.func,
  handleChangeTextBets: PropTypes.func,
  indexBlock: PropTypes.string,
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
