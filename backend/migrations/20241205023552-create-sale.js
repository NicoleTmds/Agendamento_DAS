'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Sale', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      buyerId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'User', // Nome da tabela referenciada
          key: 'id',      // Chave primária referenciada
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      cartId: {
        type: Sequelize.UUID,
        allowNull: true,
        unique: true, // Para garantir que cada venda tenha no máximo um carrinho associado
        references: {
          model: 'Cart', // Nome da tabela referenciada
          key: 'id',      // Chave primária referenciada
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL', // Caso o carrinho seja deletado, o `cartId` será setado para NULL
      },
      saleDate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW, // Data atual como padrão
      },
      totalValue: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },  
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Sale');
  },
};