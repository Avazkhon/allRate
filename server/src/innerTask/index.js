const rateModels = require('../models/rate');
const WriteToLog = require('../utils/writeToLog');

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
      statusLife: true
    }

  }

  async update(arr, status) {
    for (var rate of arr) {
      rateModels.findByIdAndUpdate(rate._id, { statusLife: status }, (err, result) => {
        if (err) {
          writeToLog.write(err, 'inner_task_update.err')
        }
      });
    }
  }

  async checkIsNew () {
    // в объектах указано в часовом поясе 0.
    // поэтому ищем с этим соотвествием
    const zeroZone = new Date(new Date() + '+00:00');
    // находим обекты до указанного времени + минута для погрешности
    const dateStart = { $lte: new Date(new Date(zeroZone).setMinutes(1)) };
    const data = await (
      rateModels.getByProps(
        { statusLife: this.new , dateStart },
        this.paramsForIsNew,
      ).catch((err) => {
        writeToLog.write(err, 'inner_task_check_new.err')
      })
    );
    if (!data.length) {
      return;
    }
    await this.update(data, this.active);
  }

  async checkIsActive () {
    const zeroZone = new Date(new Date() + '+00:00');
    const data = await (rateModels.getByProps(
      {
        statusLife: this.active,
        dateFinish: { $lte: new Date(new Date(zeroZone).setMinutes(1)) }
      },
      this.paramsForIsActive,
    )).catch((err) => {
      writeToLog.write(err, 'inner_task_check_active.err')
    });

    if (!data.length) {
      return;
    }
    await this.update(data, this.finish);
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
