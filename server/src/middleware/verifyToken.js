const jwt = require("jsonwebtoken");
require("dotenv").config();
const db = require("../config/db");

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ message: "Missing token" });
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    try {
      const appRepo = db.getRepository("Auth");
      const user = await appRepo.findOne({ where: { email: decoded.email } });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      req.user = {
        id: user.id,
        email: user.email,
        userType: user.user,
      };
      next();
    } catch (dbErr) {
      console.error("DB error:", dbErr);
      res.status(500).json({ message: "Database error" });
    }
  });
};

module.exports = verifyToken;
