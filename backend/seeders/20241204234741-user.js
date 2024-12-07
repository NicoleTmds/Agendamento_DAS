'use strict';

/** @type {import('sequelize-cli').Seed} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('User', [
      {
        id: 'a52467a3-3a71-45c4-bf1c-9ace5ad3668f',
        name: 'Nicole Souza',
        birthDate: new Date('2004-01-21'),
        cpf: '137.996.754-69',
        rg: '405060-7',
        email: 'nicole@gmail.com',
        password: '123', 
        role: 'BUYER',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'b52467a3-3a71-45c4-bf1c-9ace5ad3668f',
        name: 'Leticia Souza',
        birthDate: new Date('2002-03-27'),
        cpf: '137.996.842-46',
        rg: '504060-7',
        email: 'leticia@gmail.com',
        password: '123',
        role: 'SELLER',  // Ou 'BUYER'
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('User', null, {});
  }
};