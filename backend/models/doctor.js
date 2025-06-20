'use strict';
const {
    Model, DataTypes
} = require('sequelize');
module.exports = (sequelize) => {
    class Doctor extends Model {
        static associate(models) {
            Doctor.hasMany(models.Scheduling, { foreignKey: 'doctorId', as: 'schedulings', onDelete: 'CASCADE' });
            Doctor.belongsTo(models.Specialty, { foreignKey: 'specialtyId', as: 'specialties' });
        }
    }
    Doctor.init(
        {
            id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
            specialtyId: { type: DataTypes.INTEGER, allowNull: false },
            name: { type: DataTypes.STRING, allowNull: false },
            crm: { type: DataTypes.STRING, allowNull: false, unique: true },
            telephone: { type: DataTypes.STRING, allowNull: false },
            createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
        },
        {
            sequelize,
            modelName: 'Doctor',
            tableName: 'doctors',
        }
    );


    return Doctor;
};