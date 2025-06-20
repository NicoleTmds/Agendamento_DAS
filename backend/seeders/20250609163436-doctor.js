'use strict';

const { Specialty, Doctor } = require('../models');

module.exports = {
  async up(queryInterface, Sequelize) {
    const cardio = await Specialty.findOne({ where: { name: 'Cardiologista' } });
    const derma = await Specialty.findOne({ where: { name: 'Dermatologista' } });
    const neuro = await Specialty.findOne({ where: { name: 'Neurologista' } }); // <-- ADICIONADO

    if (!cardio || !derma || !neuro) {
      console.error('Erro no seeder de doctors: uma ou mais especialidades não foram encontradas. Rode o seeder de specialties primeiro.');
      return;
    }

    await Doctor.bulkCreate([
      {
        specialtyId: cardio.id,
        name: 'Dr. João Silva',
        crm: '12345',
        telephone: '11977777777',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        specialtyId: cardio.id,
        name: 'Dr. Miguel Santos',
        crm: '75486',
        telephone: '11966666666',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        specialtyId: derma.id,
        name: 'Dra. Maria Oliveira',
        crm: '67890',
        telephone: '11955555555',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        specialtyId: neuro.id,
        name: 'Dr. Ricardo Lima',
        crm: '54321',
        telephone: '11944444444',
        createdAt: new Date(),
        updatedAt: new Date()
      },

    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('doctors', null, {});
  }
};