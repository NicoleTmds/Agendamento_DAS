'use strict';
const { 
    Model, DataTypes 
} = require('sequelize');
module.exports = (sequelize) => {
  class PaymentMethod extends Model {
    static associate(models) {
      PaymentMethod.belongsTo(models.User, { foreignKey: 'userId', as: 'user', onDelete: 'CASCADE' });
      PaymentMethod.hasMany(models.Payment, { foreignKey: 'paymentMethodId', as: 'payment', onDelete: 'CASCADE' });
    }
  }
  PaymentMethod.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      userId: { type: DataTypes.INTEGER, allowNull: false },
      type: { type: DataTypes.STRING, allowNull: false },
      holderName: { type: DataTypes.STRING, allowNull: false },
      cardNumber: { type: DataTypes.STRING },
      expirationDate: { type: DataTypes.DATE },
      cvc: { type: DataTypes.STRING },
    },
    { 
        sequelize, 
        modelName: 'PaymentMethod',
        tableName: 'PaymentMethod',
    }
  );
  return PaymentMethod;
};