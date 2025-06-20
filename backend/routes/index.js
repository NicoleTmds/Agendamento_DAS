const router = require('express').Router();

const specialtyRouter = require('./specialty');
const doctorRouter = require('./doctor');
const schedulingRouter = require('./scheduling');

router.use('/specialties', specialtyRouter);
router.use('/doctors', doctorRouter);
router.use('/schedulings', schedulingRouter);

module.exports = router;