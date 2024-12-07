'use strict';

/** @type {import('sequelize-cli').Seed} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Cart', [
      {
        id: 'c62467a3-3a71-45c4-bf1c-9ace5ad3668f',
        userId: 'a52467a3-3a71-45c4-bf1c-9ace5ad3668f', 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Cart', null, {});
  }
};