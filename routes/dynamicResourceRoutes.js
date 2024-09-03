// routes/dynamicResourceRoutes.js
const express = require('express');
const { loadResource } = require('../middleware/resourceMiddleware');
const { getAllRecords, createRecord } = require('../controllers/dynamicResourceController');

const router = express.Router();

router.route('/:projectId/:apiPrefix/:resourceName')
    .get(loadResource, getAllRecords)
    .post(loadResource, createRecord);

// You can add PUT and DELETE routes similarly

module.exports = router;
