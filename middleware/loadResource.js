// middleware/loadResource.js
const mongoose = require('mongoose');

module.exports = (req, res, next) => {
    const { resourceName } = req.params;

    // Check if the model is registered
    if (!mongoose.modelNames().includes(resourceName)) {
        return res.status(400).json({ message: `Resource ${resourceName} is not registered.` });
    }

    next();
};
