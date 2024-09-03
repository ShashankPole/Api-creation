const mongoose = require('mongoose'); // Add this line if it's missing

const { registerModel } = require('../models/dynamicModelRegistration');
// controllers/dynamicResourceController.js
exports.getAllRecords = async (req, res) => {

    try {
        const Model = mongoose.model(req.resource.name); // This assumes the model is already registered
        const records = await Model.find();
        res.json(records);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createRecord = async (req, res) => {
    const { resourceName, fields } = req.body; // Assume `fields` contains the structure of the resource



    try {
        // Register the schema for the resource dynamically
        registerModel(req.resource.name, req.resource.fields);




        const Model = mongoose.model(req.resource.name);

        const newRecord = new Model(req.body.data); // Assume `data` contains the record data
        await newRecord.save();

        res.status(201).json(newRecord);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Similar functions can be created for updateRecord and deleteRecord
