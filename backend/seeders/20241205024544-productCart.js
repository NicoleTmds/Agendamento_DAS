'use strict';

/** @type {import('sequelize-cli').Seed} */
module.exports = {
  async up(queryInterface, Sequelize) {
      await queryInterface.bulkInsert('ProductCart', [
        {
          id: 'd62467a3-3a71-45c4-bf1c-9ace5ad3668f',
          cartId: 'c62467a3-3a71-45c4-bf1c-9ace5ad3668f', 
          productId: 'e52467a3-3a71-45c4-bf1c-9ace5ad3668f', 
          quantity: 1, 
          color: 'Preto',
          totalPrice: 86.00,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ProductCart', null, {});
  }
};
