require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const errorHandler = require("./middleware/errorMiddleware");
const cors = require("cors");

const app = express();
app.use(cors());

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api/tasks", require("./routes/tasks"));
app.use("/api/users", require("./routes/users"));

// Error handling middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3005;
mongoose
  .set("strictQuery", false)
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });
