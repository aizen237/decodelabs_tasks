const express = require('express');
const router = express.Router();
const controller = require('../controllers/applicationController');

router.get('/', controller.getAllApplications);
router.post('/', controller.createApplication);
router.patch('/:id', controller.updateApplication);
router.delete('/:id', controller.deleteApplication);

module.exports = router;