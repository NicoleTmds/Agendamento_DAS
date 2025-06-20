'use strict';
const {
    Model, DataTypes
} = require('sequelize');
module.exports = (sequelize) => {
    class Scheduling extends Model {
        static associate(models) {
            Scheduling.belongsTo(models.User, { foreignKey: 'userId', as: 'users' });
            Scheduling.belongsTo(models.Doctor, { foreignKey: 'doctorId', as: 'doctors' });
        }
    }

    Scheduling.init(
        {
            id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
            userId: { type: DataTypes.INTEGER, allowNull: false },
            doctorId: { type: DataTypes.INTEGER, allowNull: false },
            schedulingDate: { type: DataTypes.DATEONLY, allowNull: false },
            schedulingTime: { type: DataTypes.TIME, allowNull: false },
            status: {
                type: DataTypes.ENUM('agendado', 'cancelado'),
                defaultValue: 'agendado'
            },
            createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
        },
        {
            sequelize,
            modelName: 'Scheduling',
            tableName: 'schedulings',
        }
    );


    return Scheduling;
};