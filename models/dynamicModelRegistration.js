// models/dynamicModelRegistration.js
const mongoose = require('mongoose');

function registerModel(resourceName, fields) {
    const modelName = resourceName.charAt(0).toUpperCase() + resourceName.slice(1);

    // Check if the model is already registered
    if (mongoose.modelNames().includes(modelName)) {
        return mongoose.model(modelName);
    }

    // Define the schema fields
    const schemaDefinition = {};
    fields.forEach(field => {
        schemaDefinition[field.key] = {
            type: field.type === 'number' ? Number : String,
            required: true
        };
    });

    const schema = new mongoose.Schema(schemaDefinition);

    // Register the model dynamically
    return mongoose.model(modelName, schema);
}

module.exports = { registerModel };
