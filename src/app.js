const express = require('express');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const authRoutes = require("./routes/auth.routes");
const itemRoutes = require("./routes/item.routes");
const tdeeRoutes = require("./routes/tdee.routes");
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use("/auth", authRoutes);
app.use("/items", itemRoutes); 
app.use("/tdee", tdeeRoutes); 
module.exports = app;

