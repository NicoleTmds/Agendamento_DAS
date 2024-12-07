'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PaymentMethod', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'User',
          key: 'id',   
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE', // Se o usuário for deletado, a relação é deletada também
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false, // Tipo do método de pagamento (ex: "credit_card", "boleto", "pix")
      },
      holderName: {
        type: Sequelize.STRING,
        allowNull: false, // Nome do titular do método de pagamento
      },
      cardNumber: {
        type: Sequelize.STRING,
        allowNull: true,  // Número do cartão (pode ser null para outros tipos de pagamento)
      },
      expirationDate: {
        type: Sequelize.DATE,
        allowNull: true,  // Data de validade (somente para cartões)
      },
      cvc: {
        type: Sequelize.STRING,
        allowNull: true,  // Código de segurança (somente para cartões)
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
    await queryInterface.dropTable('PaymentMethod');
  },
};
