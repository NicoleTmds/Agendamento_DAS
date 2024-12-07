//Exports the entity controllers in a single object

const productController = require('./product');
const categoryController = require('./category');
const authController = require('./auth');

module.exports = {
  productController,
  categoryController,
  authController,
};
