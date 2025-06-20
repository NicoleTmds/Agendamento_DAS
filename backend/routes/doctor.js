const router = require('express').Router();
const { findAll, findAvailability } = require('../controllers/doctor');

router.get('/', findAll);
router.get('/:id/availability', findAvailability);

module.exports = router;