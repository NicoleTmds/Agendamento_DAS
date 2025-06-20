'use strict';
const {
  Model, DataTypes
} = require('sequelize');
module.exports = (sequelize) => {
  class Specialty extends Model {
    static associate(models) {
      Specialty.hasMany(models.Doctor, { foreignKey: 'specialtyId', as: 'doctors', onDelete: 'CASCADE' });
    }
  }

  Specialty.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING, allowNull: false, unique: true },
    },
    {
      sequelize,
      modelName: 'Specialty',
      tableName: 'specialties',
    }
  );


  return Specialty;
};