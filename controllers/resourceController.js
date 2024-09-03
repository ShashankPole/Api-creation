// controllers/resourceController.js
const Resource = require('../models/resourceModel');
const Project = require('../models/projectModel');
const { registerModel } = require('../models/dynamicModelRegistration');
const ResourceModel = require('../models/resourceModel');

exports.createResource = async (req, res) => {
    const { name, fields, projectId } = req.body;

    if (!name || !Array.isArray(fields) || fields.length === 0) {
        return res.status(400).json({ message: 'Resource name and fields are required' });
    }

    // Validate that the fields array is provided and is not empty
    if (!fields || !Array.isArray(fields) || fields.length === 0) {
        return res.status(400).json({ message: "Fields array is required and should not be empty" });
    }


    try {
        // Register the resource's schema
        registerModel(name, fields);

        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Check if the resource name already exists for the project
        const resourceExists = await Resource.findOne({ name, project: projectId });

        if (resourceExists) {
            return res.status(400).json({ message: 'Resource already exists for this project' });
        }

        // Generate the API endpoint

        // Save the resource metadata to the database
        const resource = new ResourceModel({ name, fields, project: projectId });
        await resource.save();

        const apiEndpoint = `http://localhost:5000/${projectId}/${project.apiPrefix}/${name}`;


        // Respond with the resource details and the generated API endpoint
        res.status(201).json({
            resource,
            apiEndpoint,
        });



    } catch (error) {
        res.status(500).json({ message: error.message });
    }


};

// Get all resources for a specific project
exports.getResources = async (req, res) => {
    const { projectId } = req.params;

    try {
        const resources = await Resource.find({ project: projectId });

        if (!resources.length) {
            return res.status(404).json({ message: 'No resources found for this project' });
        }

        const project = await Project.findById(projectId);
        const resourcesWithEndpoints = resources.map(resource => ({
            resource,
            apiEndpoint: `http://localhost:5000/${projectId}/${project.apiPrefix}/${resource.name}`,
        }));

        res.json(resourcesWithEndpoints);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
