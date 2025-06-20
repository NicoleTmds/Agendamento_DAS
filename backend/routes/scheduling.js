const router = require('express').Router();
const { create, findForUser, generateReport, cancel, exportReport, generatePdfForOne } = require('../controllers/scheduling');

router.post('/', create);
router.get('/', findForUser);
router.get('/report', generateReport);
router.patch('/:id/cancel', cancel);
router.get('/report/export/:format', exportReport); 
router.get('/:id/pdf', generatePdfForOne);

module.exports = router;