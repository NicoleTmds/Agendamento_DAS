'use strict';

/** @type {import('sequelize-cli').Seed} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Product', [
      {
        id: 'e52467a3-3a71-45c4-bf1c-9ace5ad3668f',
        name: 'Calça Legging Com Curva Lateal',
        category: 'Legging feminina',
        color: 'Preto',
        stock: 50,
        price: 86.00,
        sellerId: 'b52467a3-3a71-45c4-bf1c-9ace5ad3668f', 
        imageUrl: 'https://res.cloudinary.com/dvavepgak/image/upload/v1733357218/977f0653-bb6f-4a9f-bc79-4f6e4609a996.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'f52467a3-3a71-45c4-bf1c-9ace5ad3668f',
        name: 'Calça Legging com Tule Lateral',
        category: 'Legging feminina',
        color: 'Cinza',
        stock: 30,
        price: 65.50,
        sellerId: 'b52467a3-3a71-45c4-bf1c-9ace5ad3668f',
        imageUrl: 'https://res.cloudinary.com/dvavepgak/image/upload/v1733357343/4c59e24d-1c47-4727-8a27-3709c2a989a1.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'a62467a3-3a71-45c4-bf1c-9ace5ad3668f',
        name: 'Short com Bolso e Ponto de Cobertura',
        category: 'Short feminino',
        color: 'Vinho',
        stock: 100,
        price: 95.75,
        sellerId: 'b52467a3-3a71-45c4-bf1c-9ace5ad3668f',
        imageUrl: 'https://res.cloudinary.com/dvavepgak/image/upload/v1733357451/9c52ee86-00f2-4d95-939b-f5146f915c8b.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'b62467a3-3a71-45c4-bf1c-9ace5ad3668f',
        name: 'Calça Legging com Recore Lateral de Tule',
        category: 'Legging feminina',
        color: 'Verde Militar',
        stock: 32,
        price: 82.50,
        sellerId: 'b52467a3-3a71-45c4-bf1c-9ace5ad3668f',
        imageUrl: 'https://res.cloudinary.com/dvavepgak/image/upload/v1733357448/8fd9c7d2-fd92-489c-bdc4-1dd5dbeb2108.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Product', null, {});
  }
};
