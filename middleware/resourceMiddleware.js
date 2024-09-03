// middleware/resourceMiddleware.js
const Resource = require('../models/resourceModel');
const Project = require('../models/projectModel');

exports.loadResource = async (req, res, next) => {
    const { projectId, resourceName } = req.params;

    console.log(`Received request for projectId: ${projectId}, resourceName: ${resourceName}`);

    try {
        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        const resource = await Resource.findOne({ name: resourceName, project: projectId });

        if (!resource) {
            return res.status(404).json({ message: 'Resource not found' });
        }

        req.resource = resource; // Attach the resource model to the request
        req.project = project; // Attach the project to the request

        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
