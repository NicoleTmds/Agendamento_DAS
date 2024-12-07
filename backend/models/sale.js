'use strict';
const { 
    Model, DataTypes 
} = require('sequelize');
module.exports = (sequelize) => {
  class Sale extends Model {
    static associate(models) {
      Sale.belongsTo(models.User, { foreignKey: 'buyerId', as: 'buyer', onDelete: 'CASCADE' });
      Sale.belongsTo(models.Cart, { foreignKey: 'cartId', as: 'cart', onDelete: 'CASCADE' });
      Sale.hasMany(models.Payment, { foreignKey: 'saleId', as: 'payments', onDelete: 'CASCADE' });
    }
  }
  Sale.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      buyerId: { type: DataTypes.INTEGER, allowNull: false },
      cartId: { type: DataTypes.INTEGER },
      saleDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      totalValue: { type: DataTypes.FLOAT, allowNull: false },
    },
    { 
        sequelize, 
        modelName: 'Sale',
        tableName: 'Sale',
    }
  );


  return Sale;
};