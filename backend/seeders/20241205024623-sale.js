'use strict';

/** @type {import('sequelize-cli').Seed} */
module.exports = {
  async up(queryInterface, Sequelize) {
      await queryInterface.bulkInsert('Sale', [
        {
          id: 'e62467a3-3a71-45c4-bf1c-9ace5ad3668f', 
          buyerId: 'a52467a3-3a71-45c4-bf1c-9ace5ad3668f',        
          cartId: 'c62467a3-3a71-45c4-bf1c-9ace5ad3668f',          
          saleDate: new Date(),  
          totalValue: 86.00,  
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Sale', null, {});
  }
};
