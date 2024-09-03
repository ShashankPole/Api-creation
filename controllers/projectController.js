// controllers/projectController.js
const Project = require('../models/projectModel');

exports.createProject = async (req, res) => {
    const { name, apiPrefix } = req.body;

    try {
        const project = await Project.create({
            name,
            apiPrefix,
            user: req.user.id,
        });

        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find({ user: req.user.id });
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateProject = async (req, res) => {
    const { name, apiPrefix } = req.body;

    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        if (project.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        project.name = name || project.name;
        project.apiPrefix = apiPrefix || project.apiPrefix;

        const updatedProject = await project.save();

        res.json(updatedProject);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        if (project.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await project.remove();

        res.json({ message: 'Project removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
