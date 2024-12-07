'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Payment', [
      {
        id: 'c62467a3-3a71-45c4-bf1c-9ace5ad3668f',
        saleId: 'e62467a3-3a71-45c4-bf1c-9ace5ad3668f', 
        paymentMethodId: 'e72467a3-3a71-45c4-bf1c-9ace5ad3668f', 
        amount: 86.75, 
        paymentDate: new Date(), // Data do pagamento (data atual)
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Payment', null, {});
  },
};
 