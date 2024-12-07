'use strict';
const{ 
  Model, DataTypes
} = require('sequelize');
module.exports = (sequelize) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Address, { foreignKey: 'userId', as: 'addresses', onDelete: 'CASCADE' });
      User.hasMany(models.PaymentMethod, { foreignKey: 'userId', as: 'paymentMethods', onDelete: 'CASCADE' });
      User.hasMany(models.Product, { foreignKey: 'sellerId', as: 'products', onDelete: 'CASCADE' });
      User.hasOne(models.Cart, { foreignKey: 'userId', as: 'cart', onDelete: 'CASCADE' });
      User.hasMany(models.Sale, { foreignKey: 'buyerId', as: 'sales', onDelete: 'CASCADE' });
    }
  }
  User.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING, allowNull: false },
      birthDate: { type: DataTypes.DATE, allowNull: false },
      cpf: { type: DataTypes.STRING, allowNull: false, unique: true },
      rg: { type: DataTypes.STRING, allowNull: false, unique: true },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: { type: DataTypes.STRING, allowNull: false },
      role: { type: DataTypes.ENUM('BUYER', 'SELLER'), defaultValue: 'BUYER' },
      createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    { 
      sequelize, 
      modelName: 'User',
      tableName: 'User',
    }
  );


  return User;
};