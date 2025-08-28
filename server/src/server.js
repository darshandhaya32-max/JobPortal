const express = require("express");
const cors = require("cors");
const router = require("./Routes/appRoutes");
const db = require("./config/db");
require("dotenv").config();

const app = express();

// CORS configuration
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "https://jobportal-1-53h9.onrender.com"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,
  })
);

// Enable preflight across all routes
app.options("*", cors());

// Parse JSON and urlencoded requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// API routes
app.use("/api", router);

// Initialize database and start server
db.initialize()
  .then(() => {
    console.log("Database Connected");
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Backend running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database initialization failed:", err);
  });
