const mongoose = require('mongoose');
const сategories = require('./сategoriesSchema');
const CreateModel = require('../CreateModel');

const сategoriesModel = new CreateModel(
  'Сategories',
  сategories.сategoriesSchema
);

module.exports = сategoriesModel;
