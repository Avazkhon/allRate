const schema = require('./schema');
const CreateModel = require('../CreateModel');

class UserModal extends CreateModel {

  checkPassword = (getParams) => {
    let params = {};
    if (getParams.password) {
      delete getParams.password;
      params = { ...getParams };
    } else {
      params = { ...getParams, password: 0 };
    }
    return params
  }

  async findOne (searchParams, getParams = {}) {

    return super.findOne(searchParams, this.checkPassword(getParams));
  }
}

module.exports = new UserModal(
  'Users',
  schema.userSchema
);
