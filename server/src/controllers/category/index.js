// const blockModels = require('../../models/block');
const сategoriesModel = require('../../models/сategories');
// const userModels = require('../../models/user');
const WriteToLog = require('../../utils/writeToLog');

class Categories {
  constructor() {

  }

  createCategories = (req, res) => {
    const template = {
      name: "Категории",
      code: "categories",
      children: [
        {
          name: "Спорт",
          code: "sport",
          children: []
        },
        {
          name: "Кмбер спорт",
          code: "cybersport",
          children: []
        }
      ]
    }

    сategoriesModel.create(template)
      .then((category) => {
        res.status(200).json(category)
      })
  }
  getCategories = (req, res) => {
    сategoriesModel.findOne()
      .then((obj) => {
        res.status(200).json(obj)
      })
  }

  putCategories = () => {

  }
}

module.exports = Categories
