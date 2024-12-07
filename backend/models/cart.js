'use strict';
const { 
    Model, DataTypes 
} = require('sequelize');
module.exports = (sequelize) => {
  class Cart extends Model {
    static associate(models) {
      Cart.belongsTo(models.User, { foreignKey: 'userId', as: 'user', onDelete: 'CASCADE' });
      Cart.hasMany(models.ProductCart, { foreignKey: 'cartId', as: 'cartItems', onDelete: 'CASCADE' });
      Cart.hasOne(models.Sale, { foreignKey: 'cartId', as: 'sale', onDelete: 'CASCADE' });
    }
  }
  Cart.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      userId: { type: DataTypes.INTEGER, allowNull: false, unique: true },
    },
    { 
        sequelize, 
        modelName: 'Cart', 
        tableName: 'Cart', 
    }
  );
  return Cart;
};