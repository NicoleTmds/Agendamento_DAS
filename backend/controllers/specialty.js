const { Specialty } = require('../models');

/**
 * Busca e retorna todas as especialidades.
 */
const findAll = async (req, res) => {
    try {
        const specialties = await Specialty.findAll({
            attributes: ['id', 'name'],
            order: [['name', 'ASC']],
        });
        return res.status(200).json(specialties);
    } catch (error) {
        console.error("Erro no controller specialty.findAll:", error);
        return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

module.exports = {
    findAll,
};