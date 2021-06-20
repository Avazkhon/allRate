import React, { useState, useEffect } from 'react';
import PropTypes, { node } from 'prop-types';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { Helmet } from "react-helmet";

import { Carousel } from 'react-bootstrap';

import {
  Grid,
  Stepper,
  Step,
  StepContent,
  Button,
  Paper,
  Typography,
  StepLabel
} from '@material-ui/core';

import {
  getPostsPage,
  getRatesPage,
  addCountViewsPost,
  changeRatingPost,
  getPostPostsByDate,
  getUsersByIds
} from 'actions';

import {
  BestPostList
} from './BestPostList';

import Layout from '../Layout';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: 20
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
  carousel: {
    marginTop: 20
  },
  carousel_title: {
    fontSize: '14px'
  },
  link: {
    '&:hover': {
      textDecoration: 'none'
    }
  },
  bestPost: {
    margin: '24px 0 16px 0'
  },
  postItem: {
    marginTop: 16
  }
}));

function getSteps() {
  return [
    'Создание ставки',
    'Описания пари',
    'Привлечь игроков',
    'Завершения события',
    'Получаете прибыль'
  ];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return `
              Зарегистрируйтесь заполнив поля на странице регистрация.
              Переходите в меню "Создать ставку" Заполняете информацию о событие.
              Нажимаете "Создать ставку"
              `;
    case 1:
      return `
              Описываете пари и условия победы (события которое должно произойти к примеру победа одной из команд)
              Сохраняете изменения
              `;
    case 2:
      return `
              Приглашаете участвовать своих последователей. Ваши подписчике на сервисе увидят вашу ставку в ленте своих новостей.
              После окончания события и подведения результатов Вы нажимаете завершить и выбираете те пункты которые произошли
              нажав на соответствующую кнопку
             `;
    case 3:
      return `
              После выбора всех произошедших событий Вы нажимаете "Сделать выплаты" после чего произойдет оплата зашедших ставок
              Да-да это вы выплачиваете игрокам из собранных денег совсем как букмекер!
             `;
    case 4:
      return `
              Вы получите проценты от всех сделанных ставок вне зависимости кто победил в размере 5% от всех сделанных ставок
              на свой кошелек. Деньги вы можете вывести на карту
             `;
    default:
      return 'Попробуйте перезагрузить страницу';
  }
}

const description = `
Официальный сайт пользовательских на спорт - FaceBetting.
Тут вы узнаете как выиграть на ставках на спорт. Как создавать ставки и зарабатывать день.
Найти прогнозы на спорт и киберспорт.
`;


function Home(props) {
  const {
    rate,
    getRatesPage,
    changeRatingPost,
    users,
    lang,
    auth,
    getPostPostsByDate,
    getUsersByIds
  } = props;
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [postsForSlader, setPostsForSlader] = useState({});
  const [postsBest, setPostsBest] = useState({});
  const steps = getSteps();

  useEffect(() => {
    getPostPostsByDate({ page: 1, limit: 6 })
      .then((action) => {
        if (action.status === 'SUCCESS') {
          setPostsForSlader(action.response)
        }
      });
    getRatesPage({ page: 1, limit: 6, statusLife: ['active', 'new'] });
    handleGetPostPostsByDate()
  }, []);

  function handleGetPostPostsByDate() {
    return getPostPostsByDate({
      page: 1,
      limit: 24,
      createDateStart: moment().subtract(1, 'months').format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
      createDateEnd: moment().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
    })
      .then((action) => {
        if (action.status === 'SUCCESS') {
          let unique = action.response.docs.reduce((acc, post)=>acc.add(post.authorId), new Set());
          getUsersByIds(Array.from(unique))
          setPostsBest(action.response);
        }
      })
  }

  function handleChangeRatingPost(...rest) {
    return changeRatingPost(...rest)
      .then(() => {
        handleGetPostPostsByDate();
      })
  }

  const handleAddCountViewsPost = (postId) => {
    props.addCountViewsPost(postId)
      .then(() => {
        handleGetPostPostsByDate();
      })
  }


  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };


  return (
    <Layout>
      <Helmet>
        <meta name="description" content={description} />
      </Helmet>
      {
        postsForSlader.docs && !!postsForSlader.docs.length &&
        <Carousel className={classes.carousel}>
          {
            postsForSlader.docs.map((itm) => {
              return (
                <Carousel.Item key={itm._id}>
                  <Link to={`/post/${itm._id}`} className={classes.link}>
                    <img
                      style={{filter: 'brightness(50%)'}}
                      className="d-block w-100"
                      src={'/media/image/' + itm.img.url + '?resize=600x400'}
                      alt={itm.title}
                    />

                    <Carousel.Caption>
                      <h2 className={classes.carousel_title}>{itm.title}</h2>
                    </Carousel.Caption>
                  </Link>
                </Carousel.Item>
              )
            })
          }
        </Carousel>
      }
      {
        rate.data && rate.data.docs && !!rate.data.docs.length &&
        <Carousel className={classes.carousel}>
          {
            rate.data.docs.map((itm) => {
              return (
                <Carousel.Item key={itm._id}>
                  <Link to={`/make-rate?rateId=${itm._id}`}>
                    <img
                      style={{filter: 'brightness(50%)'}}
                      className="d-block w-100"
                      src={'/media/image/' + itm.img + '?resize=600x400'}
                      alt={itm.title}
                    />

                    <Carousel.Caption>
                      <h2 className={classes.carousel_title}>{itm.title}</h2>
                    </Carousel.Caption>
                  </Link>
                </Carousel.Item>
              )
            })
          }
        </Carousel>
      }
      <Grid>
        <h1>
          Сервис ставок Face Betting
        </h1>
        <h4>
          Пройти <Link className={classes.link} to="/auth">регистрацию</Link>
        </h4>
        <Typography>
          Face Betting это сервис для пользовательских ставок, новое слово и осмысления ставок на спорт и не только.
        </Typography>
        <Typography>
          Что мы делаем - мы делаем платформу на котором каждый человек может создать свою ставку на любое событие и заработать на этом деньги.
        </Typography>
        <Typography>
          В отличие от букмекерской конторы тут люди создают ставки на самые разные события, а не менеджеры или автоматизированная программа.
          В Face Betting вы можете выбирать и учавствовать в тех ставках которые не встретить в БК, на любимых каналах и блогеров которым вы доверяете.
          Заключать пари выбирая выгодные коэффициенты в рамках одной платформы или участвовать в нескольких заключая пари на разные исходы.
        </Typography>
        <Typography>
          Писать стать и продвигать свой канал собирая свое комьюнити или следить за новостями и публикациями.
        </Typography>
        <Typography>
          Как это работает? Вот 5 шагов к заработку в Face Betting.
        </Typography>
      </Grid>
      <Grid item xs={12} sm={8} md={9} className={classes.root}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
              <StepContent>
                <Typography>{getStepContent(index)}</Typography>
                <div className={classes.actionsContainer}>
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.button}
                    >
                      Назад
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length ? 'Назад' : 'Далее'}
                    </Button>
                  </div>
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography>
              Вот и все. Дополнительную информацию вы найдете в разделе Документация.
              Обязательно <Link to="/auth">регистрируйтесь</Link>
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Вернутся в начало
            </Button>
          </Paper>
        )}
        <>
          {
            [0, 1, 2, 3, 4, 5].map((index) => {
              return (
                <meta key={index} content={getStepContent(index)} />
              )
            })
          }
        </>
      </Grid>

      {
        postsBest.docs && (
          <BestPostList
            postsBest={postsBest}
            classes={classes}
            handleChangeRatingPost={handleChangeRatingPost}
            handleAddCountViewsPost={handleAddCountViewsPost}
            users={users}
            lang={lang}
            auth={auth.auth}
          />
        )
      }
    </Layout>
  )
}


Home.propTypes = {
  getRatesPage: PropTypes.func,
  getPostsPage: PropTypes.func,
  addCountViewsPost: PropTypes.func,
  changeRatingPost: PropTypes.func,
  getPostPostsByDate: PropTypes.func,
  getUsersByIds: PropTypes.func,
  auth: PropTypes.shape(),
  posts: PropTypes.shape(),
  rate: PropTypes.shape(),
}

function mapStateToProps(state) {
  const {
    auth,
    posts,
    rate,
    users,
    lang,
  } = state;
  return {
    auth,
    posts,
    rate,
    users,
    lang: lang.lang,
  };
}


export default connect(mapStateToProps, {
  getPostsPage,
  getRatesPage,
  addCountViewsPost,
  changeRatingPost,
  getPostPostsByDate,
  getUsersByIds
})(Home)
