const express = require("express");
const {
  getPost,
  postes,
  getSinglePost,
  DeletePost,
  EditPosts,
  MyPosts
} = require("../controllers/postControllers");
const application = require("../controllers/applyControllers");
const { signinUser, loginUser } = require("../controllers/authControllers");
const verifyToken = require("../middleware/verifyToken");
const authorizeRoles = require("../middleware/authRoles");
const validateApplication = require("../middleware/verification");

const router = express.Router();

router.get("/home", getPost);
router.get("/home/:id", getSinglePost);

router.post("/signin", signinUser);
router.post("/login", loginUser);

router.get("/myposts/:id", verifyToken, authorizeRoles("Recruiter"), MyPosts);

router.post("/posts", verifyToken, authorizeRoles("Recruiter"), postes);
router.put("/edit/:id", verifyToken, authorizeRoles("Recruiter"), EditPosts);

router.post(
  "/application",
  verifyToken,
  validateApplication,
  authorizeRoles("Applicants"), 
  application
);

router.delete("/delete/:id", verifyToken, authorizeRoles("Recruiter"), DeletePost);

module.exports = router;
