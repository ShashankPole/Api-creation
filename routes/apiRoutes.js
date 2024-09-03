// routes/apiRoutes.js
const express = require('express');
const dynamicResourceController = require('../controllers/dynamicResourceController');
const loadResource = require('../middleware/loadResource');

const router = express.Router();

router.post('/:projectId/:apiPrefix/:resourceName', loadResource, dynamicResourceController.createRecord);
router.get('/:projectId/:apiPrefix/:resourceName', loadResource, dynamicResourceController.getAllRecords);

module.exports = router;
