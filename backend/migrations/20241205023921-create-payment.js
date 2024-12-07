'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Payment', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      saleId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Sale', // Nome da tabela referenciada
          key: 'id',      // Chave primária referenciada
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE', // Se a venda for deletada, a relação é deletada também
      },
      paymentMethodId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'PaymentMethod', // Nome da tabela referenciada
          key: 'id',               // Chave primária referenciada
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE', // Se o método de pagamento for deletado, a relação é deletada também
      },
      amount: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      paymentDate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
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
    await queryInterface.dropTable('Payments');
  },
};
