import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';


import {
  Carousel,
} from 'react-bootstrap';

import {
  Grid,
  Container,
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
} from 'actions';

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


function Home({
  posts,
  rate,
  getPostsPage,
  getRatesPage,
}) {
  const classes = useStyles();

  useEffect(() => {
    getPostsPage({ page: 1, limit: 6 });
    getRatesPage({ page: 1, limit: 6, statusLife: ['active', 'new'] });
  }, [])

  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

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
      <Container>
        <Grid item xs={12} sm={8} md={9}>
            {
              posts.data && posts.data.docs && !!posts.data.docs.length &&
              <Carousel className={classes.carousel}>
                {
                  posts.data.docs.map((itm) => {
                    return (
                      <Carousel.Item key={itm._id}>
                        <Link to={`/post/${itm._id}`}>
                          <img
                            style={{filter: 'brightness(50%)'}}
                            className="d-block w-100"
                            src={'/media/image/' + itm.img.url + '?resize=600x400'}
                            alt={itm.title}
                          />

                          <Carousel.Caption>
                            <h3>{itm.title}</h3>
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
                            <p>{itm.title}</p>
                          </Carousel.Caption>
                        </Link>
                      </Carousel.Item>
                    )
                  })
                }
              </Carousel>
            }
          </Grid>
          <Grid item xs={12} sm={8} md={9} className={classes.root}>
            <h1>
              Сервис ставок Face Betting
            </h1>
            <Typography>
              Face Betting это сервис для пользовательских ставок.
              Вы создаете ставку в нашем сервисе получаете проценты от сделанных ставок вне зависимости
              от результата
            </Typography>
            <Typography>
              Как это работает? Вот 5 шагов к заработку в Face Betting
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
                <Typography>Вот и все. Дополнительную информацию вы найдете в разделе Документация</Typography>
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
      </Container>
    </Layout>
  )
}


Home.propTypes = {
  getRatesPage: PropTypes.func,
  getPostsPage: PropTypes.func,
  auth: PropTypes.shape(),
  posts: PropTypes.shape(),
  rate: PropTypes.shape(),
}

function mapStateToProps(state) {
  const {
    auth,
    posts,
    rate,
  } = state;
  return {
    auth,
    posts,
    rate,
  };
}


export default connect(mapStateToProps, {
  getPostsPage,
  getRatesPage,
})(Home)
