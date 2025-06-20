'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        name: 'Usuario1',
        cpf: '111.111.111-11',
        email: 'usuario1@gmail.com',
        telefone: '(11) 1111-1111',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Usuario2',
        cpf: '111.111.111-12',
        email: 'usuario2@gmail.com',
        telefone: '(11) 1111-1112',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
