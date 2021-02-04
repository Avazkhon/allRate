import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';


import {
  Grid,
  AppBar,
  Divider,
  Tabs,
  Tab,
  Typography,
  Box,
} from '@material-ui/core';

import Layout from '../Layout';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

// const useStyles = makeStyles((theme) => ({
//   root: {
//     backgroundColor: theme.palette.background.paper,
//     width: 500,
//   },
// }));


function Docs({ auth }) {
  // const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Layout>
      <Grid container>
        <Grid item xs={12}>
          <AppBar position="static" color="default">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab label="Как создать ставку" {...a11yProps(0)} />
              <Tab label="Как управлять ставкой" {...a11yProps(1)} />
              <Tab label="Как учавствовать в ставке" {...a11yProps(1)} />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              <h1>Как создать ставку</h1>
              <p>
                В поле заголовок введите названия вашей ставки к примеру названия команд.
              </p>
              <p>
                В поле описания введите что за события, подробную информацию о матче, дополнительную информацию.
                Где проходит матч, ваши прогнозы и призыв участвовать в вашей ставке.
              </p>
              <p>
                Выберете дату начала и дату завершения.
                Эти даты указывают промежуток времени в котором можно участвовать в ставках.
                Рекомендуется указать время начала матча как время завершения.
                Основная цель ограничить возможность сделать ставки когда исход матча становится ясным.
                Вы можете завершить ставку любое время.
              </p>
              <p>
                Выбор категории необходим для вывода в соответствующий пункт меню для наиболее эффективного поиска.
              </p>
              <p>
                Нажмите кнопку создать ставку и выберете основное изображения. Рекомендуется использовать эмблемы команд.
              </p>
              <p>
                Добавьте участника / команду, выберете для него изображения.
                Введите названия и описания команды.
                Эти данные помогут улучшить SEO и привлечь дополнительный игроков.
              </p>
              <Divider />
              <p>
                Ниже нажмите пункт создать блоки, и добавить блок.
                Здесь введите заголовок к примеру основной исход и по желанию описания события, выберете тип.
              </p>
              <p>
                <strong>Total</strong> - для ставки в котором выиграет только один пункт из блока.
              </p>
              <p>
                <strong>Boolean</strong> - для ставки в котором пункт из блока не зависим от других и однозначна
              </p>
              <p>
                После введённых данных сохраните блоки
              </p>
              <p>
                Пригласите игроков участвовать вашей ставке своих последователей
              </p>
            </TabPanel>




            <TabPanel value={value} index={1} dir={theme.direction}>
              <h1>Как управлять ставкой</h1>
              <p>
                После завершения матча, определения победителя и выявления счета.
                Выберете соответствующий пункт в блоке.
                К примеру один пункт из трех в исходе матча если у Вас тип блока total.
                Победа команды 1, ничья или победа команды 2
              </p>
              <p>
                В случае если у Вас тип блока boolean, то выберете нет или да в каждом пункте в соответствие тем чем завершился матч.
              </p>
              <p>
                После выбора пунктов во всех блоках нужно нажать сделать выплаты. (для операции потребуется некоторое время)
                Затем нажмите добавить в архив.
              </p>
              <p>
                По завершению вы получите часть своего заработка от создания ставки.
                О поступления вы можете посмотреть в своем кошельке.
              </p>
            </TabPanel>




            <TabPanel value={value} index={2} dir={theme.direction}>
              <h1>Как участвовать в ставке</h1>
              <p>
                Выберете категорию в меню. В списке можете выбрать интересующую ставку.
                Также вы можете сделать поиск по некоторым параметрам.
              </p>
              <p>
                Выбрав ставку нажмите перейти. Попав в карточку вы можете ознакомиться с информацией.
                Перейти и просмотреть автора ставки, просмотреть его рейтинг.
              </p>
              <p>
                Выберете понравившийся блок ставками нажмите пункты или соответствующую кнопку отдельного пункта которые может произойти.
                Просмотрите коэффициенты. Если коэффициента нет значит пока еще не известен.
              </p>
              <p>
                После выбора ставки появиться окно с полем для ввода суммы.
                Введите сумму от 100 рублей и нажмите сохранить, после вы можете продолжить выбрав другие события.
                Заранее пополните счет своего кошелка.
              </p>
              <p>
                Спустя некоторое время после завершения матча будут определены победители и счет.
                Затем и поступления вашего выигрыша.
                О поступления и других операции вы можете просмотреть в своем кошельке
              </p>
              <p>
                Спустя некоторое время после завершения матча будут определены победители и счет.
                Затем и поступления вашего выигрыша.
                О поступления и других операции вы можете просмотреть в своем кошельке.
                Оцените ставку и автора. Пригласите друзей.
              </p>
            </TabPanel>
          </SwipeableViews>
        </Grid>
      </Grid>
    </Layout>
  );
}

Docs.propTypes = {
  auth: PropTypes.shape(),
}

function mapStateToProps(state) {
  const {
    auth,
  } = state;
  return {
    auth,
  };
}

export default connect(
  mapStateToProps,
  {}
)(Docs);
