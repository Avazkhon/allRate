const schema = require('./schema');
const CreateModel = require('../CreateModel');

class UserModal extends CreateModel {

  async findOne (searchParams, getParams) {
    return super.findOne(searchParams, getParams);
  }

  // async findByIdAndUpdate (searchParams, data, addParms) {
  //   return super.findByIdAndUpdate(searchParams, this.checkPassword(data), addParms)
  // }
  //
  // async findOneAndUpdate (searchParams, data, addParms) {
  //   return super.findOneAndUpdate(searchParams, this.checkPassword(data), addParms)
  // }

  async getByProps (props, params) {
    return super.getByProps(props, params)
  }

  async paginate (props, params) {
    return super.paginate(props, params)
  }
}

module.exports = new UserModal(
  'Users',
  schema.userSchema
);
