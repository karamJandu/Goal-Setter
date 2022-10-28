const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then((res) =>
      console.log(`DB Connected: ${res.connection.host}`.cyan.underline)
    )
    .catch((err) =>
      console.error(`Error while connecting DB: ${err}`.red.underline)
    );
};

module.exports = connectDB;
