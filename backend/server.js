const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const colors = require("colors");
const bodyParser = require("body-parser");

const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddlerware");

dotenv.config();
const port = process.env.PORT || 5000;
connectDB();

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// Serve frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    );
  });
} else {
  app.get("/", (req, res) => {
    res.send("Please set to production");
  });
}

app.use(errorHandler);
app.listen(port, () => console.log(`Server started on port ${port}`));
