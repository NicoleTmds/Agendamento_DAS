'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('PaymentMethod', [
      {
        id: 'b72467a3-3a71-45c4-bf1c-9ace5ad3668f',
        userId: 'a52467a3-3a71-45c4-bf1c-9ace5ad3668f',
        type: 'credit_card',
        holderName: 'Nicole Tamarindo de Souza', 
        cardNumber: '1234567812345678', 
        expirationDate: '2025-12-31',
        cvc: '123', 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'e72467a3-3a71-45c4-bf1c-9ace5ad3668f',
        userId: 'a52467a3-3a71-45c4-bf1c-9ace5ad3668f', 
        type: 'boleto',
        holderName: 'Nicole Tamarindo de Souza',
        cardNumber: null, 
        expirationDate: null, 
        cvc: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'e82467a3-3a71-45c4-bf1c-9ace5ad3668f',
        userId: 'a52467a3-3a71-45c4-bf1c-9ace5ad3668f', 
        type: 'pix', 
        holderName: 'Nicole Tamarindo de Souza',
        cardNumber: null,
        expirationDate: null, 
        cvc: null, 
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('PaymentMethod', null, {});
  },
};
