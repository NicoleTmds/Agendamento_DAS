const { Doctor, Specialty, Scheduling } = require('../models');

/**
 * Busca médicos, opcionalmente filtrando por ID da especialidade.
 */
const findAll = async (req, res) => {
    try {
        const { specialtyId } = req.query;

        const whereClause = {};
        if (specialtyId) {
            whereClause.specialtyId = specialtyId;
        }

        const doctors = await Doctor.findAll({
            where: whereClause,
            attributes: ['id', 'name', 'crm'],
            include: [{
                model: Specialty,
                as: 'specialties',
                attributes: ['name']
            }]
        });

        return res.status(200).json(doctors);
    } catch (error) {
        console.error("Erro no controller doctor.findAll:", error);
        return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

/**
 * Retorna os horários disponíveis de um médico para uma data específica.
 */
const findAvailability = async (req, res) => {
    try {
        const { id } = req.params;
        const { date } = req.query;

        if (!date) {
            return res.status(400).json({ error: 'A data é obrigatória na consulta.' });
        }

        const allSlots = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'];

        const existingAppointments = await Scheduling.findAll({
            where: {
                doctorId: id,
                schedulingDate: date,
                status: 'agendado'
            },
            attributes: ['schedulingTime']
        });

        const bookedSlots = existingAppointments.map(app => app.schedulingTime.slice(0, 5));
        const availableSlots = allSlots.filter(slot => !bookedSlots.includes(slot));

        res.setHeader('Cache-Control', 'no-store');


        return res.status(200).json(availableSlots);

    } catch (error) {
        console.error("Erro no controller doctor.findAvailability:", error);
        return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

module.exports = {
    findAll,
    findAvailability,
};