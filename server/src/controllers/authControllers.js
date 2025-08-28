const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const signinUser = async (req, res) => {
  try {
    const password = req.body.password;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const appRepo = db.getRepository("Auth");
    const newApp = appRepo.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      user: req.body.user,
    });

    const savedApp = await appRepo.save(newApp);
    res.status(201).json(savedApp);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const appRepo = db.getRepository("Auth");

    const user = await appRepo.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        userType: user.user,
        userName: user.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    return res.status(200).json({
      message: "Login successful",
      accessToken: token,
    });
  } catch (err) {
    console.error("Login error:", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { signinUser, loginUser };
