'use strict';
const { 
    Model, DataTypes 
} = require('sequelize');
module.exports = (sequelize) => {
  class Address extends Model {
    static associate(models) {
      Address.belongsTo(models.User, { foreignKey: 'userId', as: 'user', onDelete: 'CASCADE' });
    }
  }
  Address.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      userId: { type: DataTypes.INTEGER, allowNull: false },
      street: { type: DataTypes.STRING, allowNull: false },
      number: { type: DataTypes.INTEGER, allowNull: false },
      city: { type: DataTypes.STRING, allowNull: false },
      state: { type: DataTypes.STRING, allowNull: false },
      zipCode: { type: DataTypes.STRING, allowNull: false },
      complement: { type: DataTypes.STRING },
    },
    { 
        sequelize, modelName: 'Address', 
        tableName: 'Adress',  
    }
  );
  return Address;
};