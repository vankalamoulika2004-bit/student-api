const express = require("express");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");

const app = express();


// ENV
dotenv.config();


// DATABASE
connectDB();


// MIDDLEWARE
app.use(express.json());


// ROUTES
app.use("/", userRoutes);


// SERVER
app.listen(process.env.PORT, () => {

  console.log("Server Started");

});