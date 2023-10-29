const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes.js");

dotenv.config();

//Connect to DB
mongoose.connect(process.env.DB_CONNECT, () =>
  console.log("Connected To Database")
);

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8080;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
);
