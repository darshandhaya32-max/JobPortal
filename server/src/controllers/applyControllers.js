const db = require("../config/db");

const application = async (req, res) => {
  try {
    const jobPostRepo = db.getRepository("JobPost");
    const appRepo = db.getRepository("Apply");

    const internId = parseInt(req.body.internId);
    if (isNaN(internId)) {
      return res.status(400).json({ message: "Invalid internId" });
    }

    const jobPost = await jobPostRepo.findOne({
      where: { id: internId },
    });

    if (!jobPost) {
      return res.status(404).json({ message: "JobPost not found" });
    }

    const newApp = appRepo.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      qualification: req.body.qualification,
      yop: req.body.yop,
      jobPost: jobPost, 
    });

    const savedApp = await appRepo.save(newApp);

    res.status(201).json(savedApp);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

module.exports = application;
