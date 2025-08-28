
const express = require("express");
const cors = require("cors");
const router = require("./Routes/appRoutes");
const db = require("./config/db");

const app = express();


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

app.options("*", cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use("/api", router);


db.initialize()
  .then(() => {
    console.log("Database Connected");
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Backend running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Something went wrong:", err);
  });
