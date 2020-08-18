const schema = require('./schema');
const CreateModel = require('../CreateModel');

class UserModal extends CreateModel {

  checkPassword = (getParams = {}) => {
    // эта функция позволяет защитить пароли и не выдает их без потребности
    // let params = {};
    // if (getParams.password) {
    //   delete getParams.password;
    //   params = { ...getParams };
    // } else {
    //   params = { ...getParams, password: 0 };
    // }
    return getParams
  }

  async findOne (searchParams, getParams) {
    return super.findOne(searchParams, this.checkPassword(getParams));
  }

  // async findByIdAndUpdate (searchParams, data, addParms) {
  //   return super.findByIdAndUpdate(searchParams, this.checkPassword(data), addParms)
  // }
  //
  // async findOneAndUpdate (searchParams, data, addParms) {
  //   return super.findOneAndUpdate(searchParams, this.checkPassword(data), addParms)
  // }

  async getByProps (props, params) {
    return super.getByProps(props, this.checkPassword(params))
  }

  async paginate (props, params) {
    return super.paginate(this.checkPassword(props), params)
  }
}

module.exports = new UserModal(
  'Users',
  schema.userSchema
);
