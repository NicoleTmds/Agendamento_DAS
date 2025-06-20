const router = require('express').Router();
const { findAll } = require('../controllers/specialty');

router.get('/', findAll);

module.exports = router;