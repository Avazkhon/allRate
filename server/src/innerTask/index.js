const rateModels = require('../models/rate');
class InnerTask {
  constructor() {

  }

  async updateToActive(arr) {
    for (var rate of arr) {
      rateModels.findByIdAndUpdate(rate._id, {statusLife: 'active'}, (err, result) => {
        if (err) {
          console.log(err);
        }
        console.log(result);
      });
    }
  }

  async checkIsNew () {
    const localZone = new Date().getTimezoneOffset() / 60;
    const zeroZone = new Date(new Date() + `${localZone}`);
    const data = await (rateModels.getByProps(
      { statusLife: 'new', dateStart: { $lte: new Date(new Date(zeroZone).setMinutes(1)) } }
    ));
    if (!data.length) {
      return;
    }
    await this.updateToActive(data);
  }
  async checkTask() {
    await this.checkIsNew();
    await setTimeout(() => {this.checkTask()}, 1000*60);
  }

}

module.exports = InnerTask;
