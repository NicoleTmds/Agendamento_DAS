'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Payment extends Model {
    static associate(models) {
      Payment.belongsTo(models.Sale, { foreignKey: 'saleId', as: 'sale', onDelete: 'CASCADE' });
      Payment.belongsTo(models.PaymentMethod, { foreignKey: 'paymentMethodId', as: 'paymentMethod', onDelete: 'CASCADE' });
    }
  }
  Payment.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      saleId: { type: DataTypes.INTEGER, allowNull: false },
      paymentMethodId: { type: DataTypes.INTEGER, allowNull: false },
      amount: { type: DataTypes.FLOAT, allowNull: false },
      paymentDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    { 
        sequelize, 
        modelName: 'Payment',
        tableName: 'Payment', 
    }
  );
  return Payment;
};