const moment = require('moment-timezone');
const rateModels = require('../models/rate');
const userModels = require('../models/user');
const WriteToLog = require('../utils/writeToLog');
const transporter = require('../utils/transporter');

const writeToLog = new WriteToLog();
class InnerTask {
  constructor() {
    this.new = 'new';
    this.active = 'active';
    this.finish = 'finish';
    this.paramsForIsNew = { // нам нужны только определеные ключи
      _id: true,
      statusLife: true
    };
    this.paramsForIsActive = { // в этот параметр будет добавлены новые ключи
      _id: true,
      statusLife: true,
      authorId: true
    }

  }

  async sendInfoRateIsFinish(rate) {
    const user = await userModels.findOne({ _id: rate.authorId });
    transporter.sendMail({
      to: user.email,
      subject: "Ваша ставка завершена", // Subject line
      text: "Face Betting", // plain text body
      html: `
        <div>
          <h3>Привет, ${user.userName}!</h3>
          <p>
            Ваша ставка завершена. Вам нужно определить исход события и сделать выплаты.
          </p>
          <p>
            Ссылка на вашу ставку: ${process.env.MAIN_URL}/create-rate/?rateId=${rate._id}
          </p>
          <p>
            Сервис пользовательских ставок <a href=${process.env.MAIN_URL}>FaceBetting</a>
          </p>
        <div/>
      `,
    })
  }

  async update(arr, status) {
    for (var rate of arr) {
      await rateModels.findByIdAndUpdate({ _id: rate._id }, { statusLife: status }, (err, result) => {
        if (err) {
          writeToLog.write(err, 'inner_task_update.err')
        }
      });
      this.sendInfoRateIsFinish(rate) ;
    }
  }

  async checkIsNew () {
    // в объектах указано в часовом поясе 0.
    // поэтому ищем с этим соотвествием
    // находим обекты до указанного времени + минута для погрешности
    const dateStart = { $lte: moment().utc().add(1, 'minutes').format()};
    const data = await (
      rateModels.getByProps(
        { statusLife: this.new , dateStart },
        this.paramsForIsNew,
      )
      .then((data) => {
        if (data && !data.length) {
          return;
        }
        this.update(data, this.active);
      })
      .catch((err) => {
        writeToLog.write(err, 'inner_task_check_new.err')
      })
    );
  }

  async checkIsActive () {
    const dateFinish = await { $lte: moment().utc().add(1, 'minutes').format() };
    await (rateModels.getByProps(
      {
        statusLife: this.active,
        dateFinish,
      },
      this.paramsForIsActive,
    )
      .then((data) => {
        if (data && !data.length) {
          return;
        }
        this.update(data, this.finish);
      })
      .catch((err) => {
        writeToLog.write(err, 'inner_task_check_active.err')
      })
    );
  }

  async checkTask() {
    try {
      await this.checkIsNew();
      await this.checkIsActive();
      await setTimeout(() => {this.checkTask()}, 1000*60);
    } catch(err) {
      writeToLog.write(err, 'inner_task_check_task.err')
      await setTimeout(() => {this.checkTask()}, 1000*60);
    }
  }

}

module.exports = InnerTask;
