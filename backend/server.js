const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");

const { errorHandler } = require("./middleware/errorMiddlerware");

dotenv.config();
const port = process.env.PORT || 5000;

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use("/api/goals", require("./routes/goalRoutes"));
app.use(errorHandler);
app.listen(port, () => console.log(`Server started on port ${port}`));
