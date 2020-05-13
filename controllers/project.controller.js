import Project from "../models/project.model";
import errorHandler from '../config/errorHandler';

class ProjectController {
  async add(req, res) {
    const newProject = new Project({
      title: req.body.title,
      summary: req.body.summary,
      description: req.body.description,
      submitDate: req.body.submitDate,
      submittedBy: req.user.username,
    });
    try {
      let result = await newProject.save();
      res.json({
        message: "New project is created successfully.",
      });
    } catch (err) {
      errorHandler.run(res, err, 500);
    }
  }

  async get(req, res) {
    try {
      let projects = await Project.find({ submittedBy: req.user.username })
        .lean()
        .exec();
      return res.json(projects);
    } catch (err) {
      errorHandler.run(res, err, 500);
    }
  }
}

export default new ProjectController();
