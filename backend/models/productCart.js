'use strict';
const { 
    Model, DataTypes 
} = require('sequelize');
module.exports = (sequelize) => {
  class ProductCart extends Model {
    static associate(models) {
      ProductCart.belongsTo(models.Cart, { foreignKey: 'cartId', as: 'cart', onDelete: 'CASCADE' });
      ProductCart.belongsTo(models.Product, { foreignKey: 'productId', as: 'product', onDelete: 'CASCADE' });
    }
  }
  ProductCart.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      cartId: { type: DataTypes.INTEGER, allowNull: false },
      productId: { type: DataTypes.INTEGER, allowNull: false },
      quantity: { type: DataTypes.INTEGER, allowNull: false },
      color: { type: DataTypes.STRING, allowNull: false },
      totalPrice: { type: DataTypes.FLOAT, allowNull: false },
    },
    { 
        sequelize, 
        modelName: 'ProductCart',
        tableName: 'ProductCart',
    }
  );

  return ProductCart;
};