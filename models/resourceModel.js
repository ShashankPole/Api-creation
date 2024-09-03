// models/resourceModel.js
const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    fields: [{
        key: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
    }],
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Resource', ResourceSchema);
