'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('specialties', [
      { name: 'Cardiologista', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Dermatologista', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Neurologista', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('specialties', null, {});
  }
};