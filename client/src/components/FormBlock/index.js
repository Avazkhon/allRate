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

import {
  typeBlock
} from '../../constants';

// import Messages from 'components/Messages';

class FormBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        title: {
          value: "Ставка 1",
          templateId: null
        },
        description: {
          value: "Описания",
          templateId: null
        },
        type: "boolean",
        bets: [
          {
            id: 1,
            condition: "а выиграет  2-0",
            participants: []
          },
          {
            id: 2,
            condition: "a выиграет  2-1",
            participants: []
          },
          {
            id: 3,
            condition: "b выиграет  2-0",
            participants: []
          },
           {
             id: 4,
            condition: "b выиграет  2-0",
            participants: []
          }
        ]
      },


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

  renderBoolType = (bets) => {
    const {
      lang,
      classes,
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
                      name="title"
                      label={textLang.conditions[lang]}
                      id="standard-password-input"
                      defaultValue={bet.condition}
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

  renderBoolTotal = (bets) => {
    const {
      lang,
      classes,
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
                      name="title"
                      label={textLang.conditions[lang]}
                      id="standard-password-input"
                      defaultValue={bet.condition}
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
      data: {
        type,
        title,
        description,
        bets,
      }
    } = this.state;

    const {
      classes,
      lang,
    } = this.props;

    return (
      <form className={classes['card-block']} noValidate autoComplete="off">
        <div>
          <TextField
            name="title"
            label={textLang.title[lang]}
            id="standard-password-input"
            defaultValue={title.value}
            required
          />
          <TextField
            name="description"
            label={textLang.description[lang]}
            defaultValue={description.value}
            required
          />
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="age-native-simple">{textLang.type[lang]}</InputLabel>
            <Select
              native
              value={type}
              // onChange={handleChange}
              inputProps={{
                name: textLang.type[lang],
                id: 'type-native-simple',
              }}
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
              type === typeBlock.total && this.renderBoolTotal(bets)
            }
          </div>
        </div>
        <Button variant="contained" onClick={this.handlePostBlock} color="primary">
          <AddCircleIcon>add_circle</AddCircleIcon>
        </Button>
        <Button variant="contained" onClick={this.handlePostBlock} color="primary">
          postBlock
        </Button>
      </form>
    );
  }
}

FormBlock.propTypes = {
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
  )(FormBlock)
)
