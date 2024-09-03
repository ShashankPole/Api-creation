// routes/dynamicRoutes.js
const express = require('express');
const Resource = require('../models/resourceModel');

const router = express.Router();

router.use('/:resourceName', async (req, res, next) => {
    const { resourceName } = req.params;
    const resource = await Resource.findOne({ name: resourceName });

    if (!resource) {
        return res.status(404).json({ message: 'Resource not found' });
    }

    req.resource = resource;
    next();
});

router.get('/:resourceName', async (req, res) => {
    const { resource } = req;

    try {
        const data = await resource.find(); // You might need to adjust this line based on your setup
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/:resourceName', async (req, res) => {
    const { resource } = req;

    try {
        const data = await resource.create(req.body); // You might need to adjust this line based on your setup
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:resourceName/:id', async (req, res) => {
    const { resource } = req;

    try {
        const data = await resource.findByIdAndUpdate(req.params.id, req.body, { new: true }); // You might need to adjust this line based on your setup
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:resourceName/:id', async (req, res) => {
    const { resource } = req;

    try {
        await resource.findByIdAndDelete(req.params.id); // You might need to adjust this line based on your setup
        res.json({ message: 'Data removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
