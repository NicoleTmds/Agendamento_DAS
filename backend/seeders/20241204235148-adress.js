'use strict';

/** @type {import('sequelize-cli').Seed} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Address', [
      {
        id: 'c52467a3-3a71-45c4-bf1c-9ace5ad3668f',
        userId: 'a52467a3-3a71-45c4-bf1c-9ace5ad3668f',
        street: 'Rua das Flores',
        number: 123,
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01234-567',
        complement: 'Apto 101',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'd52467a3-3a71-45c4-bf1c-9ace5ad3668f',
        userId: 'b52467a3-3a71-45c4-bf1c-9ace5ad3668f', 
        street: 'Avenida Brasil',
        number: 456,
        city: 'Rio de Janeiro',
        state: 'RJ',
        zipCode: '02345-678',
        complement: null, 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Address', null, {});
  }
};
