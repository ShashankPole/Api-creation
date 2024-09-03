// routes/resourceRoutes.js
const express = require('express');
const { createResource, getResources } = require('../controllers/resourceController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
    .post(protect, createResource);

router.route('/:projectId')
    .get(protect, getResources);

module.exports = router;