'use strict';

// Importe todos os modelos necessários
const { User, Doctor, Scheduling } = require('../models');

module.exports = {
  async up(queryInterface, Sequelize) {
    const usuario1 = await User.findOne({ where: { email: 'usuario1@gmail.com' } });
    const usuario2 = await User.findOne({ where: { email: 'usuario2@gmail.com' } });
    
    const drJoao = await Doctor.findOne({ where: { name: 'Dr. João Silva' } });
    const draMaria = await Doctor.findOne({ where: { name: 'Dra. Maria Oliveira' } });
    const drRicardo = await Doctor.findOne({ where: { name: 'Dr. Ricardo Lima' } });
    const drMiguel = await Doctor.findOne({ where: { name: 'Dr. Miguel Santos' } }); // <-- ADICIONADO

    // Verificação de segurança atualizada para incluir o novo médico
    if (!usuario1 || !usuario2 || !drJoao || !draMaria || !drRicardo || !drMiguel) {
      console.error('Erro no seeder de agendamentos: usuário ou médico de teste não encontrado.');
      return;
    }

    // Agora criamos 4 agendamentos, um para cada médico
    await Scheduling.bulkCreate([
      {
        userId: usuario1.id,
        doctorId: drJoao.id,
        schedulingDate: '2025-07-22',
        schedulingTime: '14:00',
        status: 'agendado',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: usuario2.id,
        doctorId: draMaria.id,
        schedulingDate: '2025-07-23',
        schedulingTime: '10:00',
        status: 'agendado',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: usuario1.id,
        doctorId: drRicardo.id,
        schedulingDate: '2025-07-24',
        schedulingTime: '11:00',
        status: 'agendado',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: usuario2.id,
        doctorId: drMiguel.id,
        schedulingDate: '2025-07-22',
        schedulingTime: '15:00',
        status: 'agendado',
        createdAt: new Date(),
        updatedAt: new Date()
      },

    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('schedulings', null, {});
  }
};